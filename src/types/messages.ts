export type MessageAttachment = {
  name: string;
  url: string;
  bytes?: number;
  format?: string;
};

export type Message = {
  id: string;
  projectId?: string;
  sender: string;
  senderType: "client" | "team";
  body: string;
  attachments: MessageAttachment[];
  createdAt: string;
  readAt?: string;
};

export type CreateMessagePayload = {
  projectId?: string;
  sender: string;
  senderType: "client" | "team";
  body: string;
  attachments?: MessageAttachment[];
};
