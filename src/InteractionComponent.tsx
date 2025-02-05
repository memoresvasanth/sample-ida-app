import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { SpeedDial } from 'primereact/speeddial';
import axios from 'axios';

const InteractionComponent: React.FC = () => {
    const [summary, setSummary] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [fileStatus, setFileStatus] = useState<string>('Pending');
    const [recording, setRecording] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showSpeedDialOptions, setShowSpeedDialOptions] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/mp4' });
        const chunks: BlobPart[] = [];

        recorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/mp4' });
            setAudioBlob(blob);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
        setShowSpeedDialOptions(true); // Keep SpeedDial options open
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const sendRecording = async () => {
        if (audioBlob) {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.mp4');
            formData.append('language', 'en'); // Add language parameter

            setLoading(true);
            setFileStatus('Uploading');

            try {
                const response = await axios.post('http://127.0.0.1:9002/transcribe-summary', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setSummary(response.data.transcription);
                setFileStatus('Uploaded');
                setShowDialog(true);
            } catch (error) {
                console.error('Error uploading file:', error);
                setFileStatus('Error');
            } finally {
                setLoading(false);
            }
        }
    };

    const downloadRecording = () => {
        if (audioBlob) {
            const url = URL.createObjectURL(audioBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recording.mp4';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleSend = () => {
        // Handle the send action here
        setShowDialog(false);
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    const items = [
        {
            label: recording ? "Stop" : "Start",
            icon: recording ? "pi pi-stop" : "pi pi-microphone",
            command: recording ? stopRecording : startRecording
        },
        {
            label: "Play",
            icon: "pi pi-play",
            command: () => {
                audioRef.current?.play();
                setShowSpeedDialOptions(true); // Keep SpeedDial options open
            },
            disabled: !audioBlob
        },
        {
            label: "Send",
            icon: "pi pi-send",
            command: sendRecording,
            disabled: !audioBlob
        },
        {
            label: "Download",
            icon: "pi pi-download",
            command: downloadRecording,
            disabled: !audioBlob
        },
        {
            label: "Close",
            icon: "pi pi-times",
            command: () => setShowSpeedDialOptions(false)
        }
    ];

    return (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'white', padding: '5px', boxShadow: '0 -2px 5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0px', marginTop: '0px' }}>
                <SpeedDial 
                    model={items} 
                    direction="up" 
                    visible={showSpeedDialOptions} 
                    onClick={() => setShowSpeedDialOptions(true)} 
                    buttonClassName="p-button-secondary" 
                    showIcon="pi pi-cog" 
                    style={{ margin: '10px', position: 'fixed', bottom: '20px', right: '20px' }} 
                />
            </div>
            <audio ref={audioRef} src={audioBlob ? URL.createObjectURL(audioBlob) : undefined} />
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <ProgressSpinner />
                </div>
            )}
            <Dialog header="Summary" visible={showDialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)}>
                <InputTextarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={10} cols={50} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <Button label="Send" onClick={handleSend} style={{ marginRight: '10px' }} />
                    <Button label="Cancel" onClick={handleCancel} className="p-button-secondary" />
                </div>
            </Dialog>
        </div>
    );
};

export default InteractionComponent;