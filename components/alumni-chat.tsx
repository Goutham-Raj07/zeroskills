"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, Video, MoreVertical } from "lucide-react"

const mockConversations = [
  {
    id: "1",
    alumni: {
      name: "Priya Sharma",
      role: "Senior Software Engineer at Google",
      avatar: "/professional-woman-diverse.png",
      status: "online",
    },
    lastMessage: "I'd be happy to help you prepare for technical interviews!",
    timestamp: "2 min ago",
    unread: 2,
    messages: [
      {
        id: "1",
        sender: "alumni",
        content: "Hi! I saw you're interested in software engineering. How can I help?",
        timestamp: "10:30 AM",
      },
      {
        id: "2",
        sender: "student",
        content:
          "Hi Priya! I'm preparing for technical interviews and would love some guidance on system design questions.",
        timestamp: "10:32 AM",
      },
      {
        id: "3",
        sender: "alumni",
        content:
          "I'd be happy to help you prepare for technical interviews! System design is crucial for senior roles. Would you like to schedule a mock interview session?",
        timestamp: "10:35 AM",
      },
    ],
  },
  {
    id: "2",
    alumni: {
      name: "Rahul Gupta",
      role: "Product Manager at Microsoft",
      avatar: "/professional-man.png",
      status: "away",
    },
    lastMessage: "The transition from engineering to PM requires...",
    timestamp: "1 hour ago",
    unread: 0,
    messages: [
      {
        id: "1",
        sender: "student",
        content:
          "Hi Rahul! I'm currently a software engineer but interested in transitioning to product management. What advice would you give?",
        timestamp: "Yesterday 3:45 PM",
      },
      {
        id: "2",
        sender: "alumni",
        content:
          "The transition from engineering to PM requires developing business acumen and user empathy. I'd recommend starting with side projects where you can practice product thinking.",
        timestamp: "Yesterday 4:20 PM",
      },
    ],
  },
]

export function AlumniChat() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add message logic here
    setNewMessage("")
  }

  return (
    <div className="grid gap-6 md:grid-cols-3 h-[600px]">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Messages</CardTitle>
          <CardDescription>Your conversations with alumni</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-2 p-4">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation.id === conversation.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.alumni.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {conversation.alumni.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          conversation.alumni.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{conversation.alumni.name}</p>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversation.alumni.role}</p>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>

                    {conversation.unread > 0 && (
                      <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="md:col-span-2">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.alumni.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {selectedConversation.alumni.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{selectedConversation.alumni.name}</CardTitle>
                <CardDescription className="text-sm">{selectedConversation.alumni.role}</CardDescription>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "student" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "student" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
