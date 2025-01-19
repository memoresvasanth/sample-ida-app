provider "aws" {
  region = "us-east-1"
}

variable "account_id" {
  default = "931053721040"
}

variable "github_token" {
  type = string
}

resource "random_id" "suffix" {
  byte_length = 5
}

resource "aws_vpc" "sample_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "sample_subnet_1" {
  vpc_id                  = aws_vpc.sample_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "sample_subnet_2" {
  vpc_id                  = aws_vpc.sample_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "sample_igw" {
  vpc_id = aws_vpc.sample_vpc.id
}

resource "aws_route_table" "sample_route_table" {
  vpc_id = aws_vpc.sample_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.sample_igw.id
  }
}

resource "aws_route_table_association" "sample_route_table_association_1" {
  subnet_id      = aws_subnet.sample_subnet_1.id
  route_table_id = aws_route_table.sample_route_table.id
}

resource "aws_route_table_association" "sample_route_table_association_2" {
  subnet_id      = aws_subnet.sample_subnet_2.id
  route_table_id = aws_route_table.sample_route_table.id
}

resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "my-codepipeline-bucket-${var.account_id}-${random_id.suffix.hex}"
}

resource "aws_ecr_repository" "sample_ida_app_ecr_repo" {
  name = "sample-ida-app-ecr"
}

resource "aws_ecs_cluster" "sample_ida_ecs_cluster" {
  name = "sample-ida-ecs-cluster"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_task_definition" "sample_task" {
  family                   = "sample-ida-ecs-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  container_definitions    = jsonencode([
    {
      name      = "sample-ida-ehr-crew"
      image     = "${var.account_id}.dkr.ecr.us-east-1.amazonaws.com/sample-ida-app-ecr:latest"
      essential = true
      memory    = 2048
      cpu       = 1024
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "sample_ida_ecs_service" {
  name            = "sample-ida-ecs-service"
  cluster         = aws_ecs_cluster.sample_ida_ecs_cluster.id
  task_definition = aws_ecs_task_definition.sample_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = [aws_subnet.sample_subnet_1.id, aws_subnet.sample_subnet_2.id]
    security_groups  = [aws_security_group.ecs_service_sg.id]
    assign_public_ip = true
  }
}

resource "aws_security_group" "ecs_service_sg" {
  name        = "ecs-service-sg"
  description = "Security group for ECS service"
  vpc_id      = aws_vpc.sample_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_iam_role" "codebuild_role" {
  name = "codebuild-role-${var.account_id}-${random_id.suffix.hex}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "codebuild_policy_attachment" {
  role       = aws_iam_role.codebuild_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

resource "aws_iam_role_policy_attachment" "codebuild_policy_attachment_2" {
  role       = aws_iam_role.codebuild_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess"
}

resource "aws_codebuild_project" "my_codebuild" {
  name          = "my-codebuild-project"
  service_role  = aws_iam_role.codebuild_role.arn
  artifacts {
    type = "NO_ARTIFACTS"
  }
  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:4.0"
    type                        = "LINUX_CONTAINER"
    privileged_mode             = true
  }
  source {
    type     = "GITHUB"
    location = "https://github.com/memoresvasanth/sample-ida-app.git"
  }
}

resource "aws_iam_role" "codepipeline_role" {
  name = "codepipeline-role-${var.account_id}-${random_id.suffix.hex}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codepipeline.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "codepipeline_policy_attachment" {
  role       = aws_iam_role.codepipeline_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodePipeline_FullAccess"
}

resource "aws_codepipeline" "my_pipeline" {
  name     = "my-codepipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.codepipeline_bucket.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        Owner       = "memoresvasanth"
        Repo        = "sample-ida-app"
        Branch      = "main"
        OAuthToken  = var.github_token
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]

      configuration = {
        ProjectName = aws_codebuild_project.my_codebuild.name
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "ECS"
      version         = "1"
      input_artifacts = ["build_output"]

      configuration = {
        ClusterName     = aws_ecs_cluster.sample_ida_ecs_cluster.name
        ServiceName     = aws_ecs_service.sample_ida_ecs_service.name
        FileName        = "imagedefinitions.json"
      }
    }
  }
}