import React, { useState, useEffect, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import axios from 'axios';
import InteractionComponent from './InteractionComponent';

const DocumentHome: React.FC = () => {
    const [summary, setSummary] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [fileStatus, setFileStatus] = useState<string>('Pending');
    const overlayPanelRef = useRef<OverlayPanel>(null);

    useEffect(() => {
        document.title = "Document Home";
    }, []);

    const onUpload = async (event: any) => {
        const file = event.files[0];
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setUploadedFile(file);
        setFileStatus('Uploading');

        try {
            const response = await axios.post('http://127.0.0.1:9002/summarize', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSummary(response.data.summary);
            setFileStatus('Uploaded');
        } catch (error) {
            console.error('Error uploading file:', error);
            setFileStatus('Error');
        } finally {
            setLoading(false);
        }
    };

    const clear = () => {
        setSummary('');
        setUploadedFile(null);
        setFileStatus('Pending');
    };

    const showOverlay = (event: any) => {
        if (overlayPanelRef.current) {
            overlayPanelRef.current.toggle(event);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <h1>Document Home</h1>
            </div>
            <FileUpload 
                name="file" 
                customUpload 
                uploadHandler={onUpload} 
                onClear={clear} 
                accept="application/pdf" 
                maxFileSize={1000000} 
                chooseLabel="Select" 
                uploadLabel="Summary" 
            />
            <OverlayPanel ref={overlayPanelRef}>
                <div style={{ padding: '10px' }}>
                    <Button label="Submit" />
                </div>
            </OverlayPanel>
            {summary && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </div>
            )}
            <InteractionComponent />
        </div>
    );
};

export default DocumentHome;