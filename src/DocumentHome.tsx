import React, { useState, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';

const DocumentHome: React.FC = () => {
    const [summary, setSummary] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    useEffect(() => {
        document.title = "Document Home";
    }, []);

    const onUpload = async (event: any) => {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setUploadedFile(file);

        try {
            const response = await axios.post('http://127.0.0.1:9002/summarize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSummary(response.data.summary);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Document Home</h1>
            <FileUpload name="file" customUpload uploadHandler={onUpload} accept="application/pdf" maxFileSize={1000000} />
            {loading ? (
                <ProgressSpinner />
            ) : (
                summary && uploadedFile && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '45%' }}>
                            <h2>Summary</h2>
                            <p>{summary}</p>
                        </div>
                        <div style={{ width: '45%' }}>
                            <h2>Uploaded PDF</h2>
                            <embed src={URL.createObjectURL(uploadedFile)} width="100%" height="500px" type="application/pdf" />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default DocumentHome;