provider "aws" {
  region = "us-east-1"
}

variable "account_id" {
  default = "931053721040"
}

# Generate a random ID for unique resource names
resource "random_id" "suffix" {
  byte_length = 5
}

# Create ECR repository
resource "aws_ecr_repository" "sample_ida_app_ecr_repo" {
  name = "sample-ida-app-ecr-repo"
}

# Create ECS cluster
resource "aws_ecs_cluster" "sample_ai_app_cluster" {
  name = "sample-ai-app-cluster"
}

# Create S3 bucket for CodePipeline artifacts with a unique name
resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "my-codepipeline-bucket-${var.account_id}-${random_id.suffix.hex}"
}

# Create IAM role for CodeBuild
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

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser",
    "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess"
  ]
}

# Create CodeBuild project
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
    environment_variable {
      name  = "REPOSITORY_URI"
      value = "931053721040.dkr.ecr.us-east-1.amazonaws.com/sample-ida-app-ecr-repo"
    }
  }
  source {
    type            = "GITHUB"
    location        = "https://github.com/your-username/your-repo.git"
    buildspec       = <<EOF
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 931053721040.dkr.ecr.us-east-1.amazonaws.com/sample-ida-app-ecr-repo
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build -t my-app .
      - docker tag my-app:latest 931053721040.dkr.ecr.us-east-1.amazonaws.com/sample-ida-app-ecr-repo:latest
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker image...
      - docker push 931053721040.dkr.ecr.us-east-1.amazonaws.com/sample-ida-app-ecr-repo:latest
EOF
  }
}

# Create IAM role for CodePipeline
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

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AWSCodePipeline_FullAccess",
    "arn:aws:iam::aws:policy/AWSCodeBuildDeveloperAccess",
    "arn:aws:iam::aws:policy/AmazonS3FullAccess"
  ]
}

# Create CodePipeline
resource "aws_codepipeline" "my_codepipeline" {
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
        Owner      = "your-username"
        Repo       = "your-repo"
        Branch     = "main"
        OAuthToken = "your-github-oauth-token"
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
}

output "ecr_repository_url" {
  value = "931053721040.dkr.ecr.us-east-1.amazonaws.com/sample-ida-app-ecr-repo"
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.sample_ai_app_cluster.name
}