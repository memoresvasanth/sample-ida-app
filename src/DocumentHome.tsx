import React, { useState, useEffect, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import InteractionComponent from './InteractionComponent';
import { API_URL } from './config';

const DocumentHome: React.FC = () => {
    const [summary, setSummary] = useState<string>('');
    const [rawText, setRawText] = useState<string>('');
    const [entities, setEntities] = useState<any[]>([]);
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
            const response = await axios.post(API_URL+'/extract-entities', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            setSummary(data.summary);
            setRawText(data.raw_text);
            setEntities(data.entities);
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
        setRawText('');
        setEntities([]);
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
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                <h1>Document Manager</h1>
            </div>
            <FileUpload 
                name="file" 
                customUpload 
                uploadHandler={onUpload} 
                onClear={clear} 
                accept="application/pdf" 
                maxFileSize={1000000} 
                chooseLabel="Select File" 
                uploadLabel="Summary" 
            />
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <ProgressSpinner />
                </div>
            )}
            <OverlayPanel ref={overlayPanelRef}>
                <div style={{ padding: '10px' }}>
                    <Button label="Submit" />
                </div>
            </OverlayPanel>
            {summary && (
                <Splitter style={{ marginTop: '20px', padding: '10px' }}>
                    <SplitterPanel size={50} minSize={30}>
                        <Splitter layout="vertical">
                            <SplitterPanel size={50} minSize={30}>
                                <h2>Summary</h2>
                                <p>{summary}</p>
                            </SplitterPanel>
                            <SplitterPanel size={50} minSize={30} style={{ display: 'flex', flexDirection: 'column' }}>
                                <h2>Entities</h2>
                                <DataTable value={entities} paginator rows={10}>
                                    <Column field="Score" header="Score" />
                                    <Column field="Type" header="Type" />
                                    <Column field="Text" header="Text" />
                                    <Column field="BeginOffset" header="Begin Offset" />
                                    <Column field="EndOffset" header="End Offset" />
                                </DataTable>
                            </SplitterPanel>
                        </Splitter>
                    </SplitterPanel>
                    <SplitterPanel size={50} minSize={30}>
                        <Splitter layout="vertical">
                            <SplitterPanel size={50} minSize={30}>
                                <h2>Raw Text</h2>
                                <p>{rawText}</p>
                            </SplitterPanel>
                            <SplitterPanel size={50} minSize={30}>
                                <h2>Uploaded PDF</h2>
                                {/* Add your PDF viewer component here */}
                            </SplitterPanel>
                        </Splitter>
                    </SplitterPanel>
                </Splitter>
            )}
            <InteractionComponent />
        </div>
    );
};

export default DocumentHome;