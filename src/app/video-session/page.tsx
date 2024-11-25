"use client";
import * as React from "react";
import { useRoomConnection } from "@whereby.com/browser-sdk/react";
import IconButton from "../../components/common/IconButton";
import ChatInput from "../../components/common/ChatInput"; 

// Replace this with your own Whereby room URL
const ROOM_URL = "https://dekxp.whereby.com/9ea743ed-f624-40d7-982b-776b606f0aaf";

export default function VideoCallPage() {
    const [isCameraActive, setIsCameraActive] = React.useState(true);
    const [isMicrophoneActive, setIsMicrophoneActive] = React.useState(true);
    const [isLocalScreenshareActive, setIsLocalScreenshareActive] = React.useState(false);
    const chatMessageBottomRef = React.useRef<HTMLDivElement>(null);

    const roomConnection = useRoomConnection(ROOM_URL, {
        localMediaOptions: {
            audio: true,
            video: true,
        },
    });

    const { state, components, actions } = roomConnection;
    const { localParticipant, remoteParticipants, screenshares, chatMessages } = state;
    const { VideoView } = components;
    const { toggleCamera, toggleMicrophone, startScreenshare, stopScreenshare, sendChatMessage } = actions;

    function getDisplayName(id: string) {
        return remoteParticipants.find((p) => p.id === id)?.displayName || "Guest";
    }

    function scrollToBottom() {
        chatMessageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    React.useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
                <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
                    <div className="chat-wrapper h-[500px] overflow-y-auto mb-4">
                        {chatMessages.map((message, index) => (
                            <div key={index} className="mb-2">
                                <p className="chat-message text-gray-800">{message.text}</p>
                                <p className="chat-message-name text-gray-500 text-sm">
                                    {getDisplayName(message.senderId)}
                                </p>
                            </div>
                        ))}
                        <div ref={chatMessageBottomRef} />
                    </div>
                    
                    {localParticipant?.stream ? (
                        <div className="self-view-wrapper mb-4">
                            <VideoView mirror muted stream={localParticipant.stream} />
                            <p className="self-name text-center mt-2">You</p>
                        </div>
                    ) : null}
                    
                    <ChatInput sendChatMessage={sendChatMessage} />
                </div>

                <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
                    <div className="video-stage space-y-4">
                        {remoteParticipants[0]?.stream ? (
                            <div className={screenshares.length ? "remote-view-small" : "remote-view-wrapper"}>
                                <VideoView stream={remoteParticipants[0].stream} />
                                <p className={screenshares.length ? "screenshare-remote-name" : "remote-name"}>
                                    {remoteParticipants[0].displayName}
                                </p>
                            </div>
                        ) : null}
                        
                        {screenshares[0]?.stream ? (
                            <div className="screenshare-view-wrapper">
                                <VideoView stream={screenshares[0].stream} />
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="col-span-3 bg-white rounded-lg shadow-md p-4">
                    <div className="control-wrapper flex justify-center space-x-4">
                        <IconButton
                            variant="camera"
                            onClick={() => {
                                setIsCameraActive((prev) => !prev);
                                toggleCamera();
                            }}
                            isActive={isCameraActive}
                        >
                            Cam
                        </IconButton>
                        <IconButton
                            variant="microphone"
                            onClick={() => {
                                setIsMicrophoneActive((prev) => !prev);
                                toggleMicrophone();
                            }}
                            isActive={isMicrophoneActive}
                        >
                            Mic
                        </IconButton>
                        <IconButton
                            variant="share"
                            onClick={() => {
                                if (isLocalScreenshareActive) {
                                    stopScreenshare();
                                } else {
                                    startScreenshare();
                                }
                                setIsLocalScreenshareActive((prev) => !prev);
                            }}
                            isActive={isLocalScreenshareActive}
                        >
                            {isLocalScreenshareActive ? "Stop" : "Share"}
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}