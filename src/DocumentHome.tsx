import React, { useState, useEffect, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import InteractionComponent from './InteractionComponent';

const DocumentHome: React.FC = () => {
    const [summary, setSummary] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [fileStatus, setFileStatus] = useState<string>('Pending');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
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
            setPdfUrl(URL.createObjectURL(file));
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
        setPdfUrl(null);
    };

    const showOverlay = (event: any) => {
        if (overlayPanelRef.current) {
            overlayPanelRef.current.toggle(event);
        }
    };

    const items: MenuItem[] = [
        {
            label: 'Recommendation',
            command: showOverlay
        }
    ];

    const start = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ marginLeft: '10px' }}>Document Home</h1>
        </div>
    );

    return (
        <div>
            <Menubar model={items} start={start} />
            <FileUpload name="file" customUpload uploadHandler={onUpload} onClear={clear} accept="application/pdf" maxFileSize={1000000} />
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ProgressSpinner />
                </div>
            )}
            {summary && pdfUrl && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <div style={{ width: '45%' }}>
                        <h2>Summary</h2>
                        <p>{summary}</p>
                    </div>
                    <div style={{ width: '45%' }}>
                        <h2>Uploaded PDF</h2>
                        <iframe src={pdfUrl} width="100%" height="500px" />
                    </div>
                </div>
            )}
            <OverlayPanel ref={overlayPanelRef}>
                <div style={{ padding: '10px' }}>
                    <Button label="Submit" />
                </div>
            </OverlayPanel>
            <InteractionComponent />
        </div>
    );
};

export default DocumentHome;