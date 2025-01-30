import React, { useState, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';

const DocumentHome: React.FC = () => {
    const [summary, setSummary] = useState<string>('');

    useEffect(() => {
        document.title = "Document Home";
    }, []);

    const onUpload = async (event: any) => {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:9002/summarize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSummary(response.data.summary);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Document Home</h1>
            <FileUpload name="file" customUpload uploadHandler={onUpload} accept="application/pdf" maxFileSize={1000000} />
            {summary && (
                <div>
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default DocumentHome;