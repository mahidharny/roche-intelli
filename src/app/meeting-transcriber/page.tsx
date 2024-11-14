"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mic,
  MicOff,
  ThumbsUp,
  ThumbsDown,
  Send,
  PlusCircle,
  Trash2,
  Share2,
  Calendar,
  Gift,
  Twitter,
  Facebook,
  Mail,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast, useToast } from "@/hooks/use-toast";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function MeetingTranscriber() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState([
    {
      speaker: "Host",
      text: "We will begin with introducing ourselves , and grateful that you were able to make it today “Gracias , Danke, Merci”. \n Your voice is critical in shaping future treatments. During your Introduction, if you feel comfortable, please share something about your journey that has inspired you or helped you stay strong through these times.",
      color: "text-black",
    },
    {
      speaker: "Patient Mary A",
      text: "How do I know if Herceptin is the right treatment for me?",
      color: "text-blue-600",
    },
    {
      speaker: "Caregiver Juan",
      text: "¿Cómo funciona Herceptin para ralentizar o detener la progresión?",
      color: "text-green-600",
    },
    {
      speaker: "Patient Juergen",
      text: "Wie lange muss ich mit Herceptin behandelt werden?",
      color: "text-red-600",
    },
  ]);
  const [consentGiven, setConsentGiven] = useState(false);
  const [meetingSummary, setMeetingSummary] = useState(
    [
      "Roche was represented by medical affairs, patient advocacy, and clinical teams. \n The meeting aimed to foster robust engagement between Roche and our patient community focusing on the experiences of living with serious conditions and discussing potential advancements in treatments and support options. It was a constructive dialogue intended to ensure patient needs and feedback are considered in the development of Roche’s therapies and advocacy strategies.",
      "Key Discussion Points",
      "1. Patient Experiences",
      "2. Access to Treatments",
      "3. Clinical Trials and Research",
      "4. Patient Support and Advocacy",
      "The need for holistic support services was a major theme. The patients suggested",
      "Expanding patient advocacy programs that offer emotional support, financial guidance, and information on treatment options",
      "Increased use of digital tools to help manage appointments, track treatment progress, and communicate more effectively with healthcare providers.",
      "5. Innovations and Future Therapies",
    ].join("\n")
  );
  const aiSuggestions = [
    "How often do I need to follow up with my doctor?",
    "What are the signs that my treatment is working?",
    "What should I do if I miss a dose of my medication?",
    "How can I manage the side effects of my treatment?",
  ];

  const [showSideMenu, setShowSideMenu] = useState(false);
  const toggleSideMenu = () => setShowSideMenu(!showSideMenu);

  const toggleRecording = () => {
    if (!consentGiven) {
      toast({
        title: "Consent Required",
        description: "Please provide consent before starting the recording.",
        variant: "destructive",
      });
      return;
    }
    setIsRecording(!isRecording);
    // Here you would typically start or stop the actual transcription process
  };

  const handleConsentChange = (value: string) => {
    setConsentGiven(value === "yes");
  };

  const sendSignedConsent = () => {
    // Simulating sending consent via email and text
    toast({
      title: "Consent Sent",
      description: "Signed consent has been sent via email and text.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      <div
        className={`flex flex-col ${showSideMenu ? "w-2/3" : "w-[100%]"} pr-4`}
      >
        <Card className="flex-grow mb-4 relative">
          <CardHeader>
            <CardTitle className="bg-[#304db3] text-white flex items-center">
              <div className="flex-col gap-4 items-center h-[100%] bg-white p-2">
                <Image
                  className="dark:invert"
                  src="/roche-logo-new.png"
                  alt="Vercel logomark"
                  width={50}
                  height={50}
                />
                <Image
                  className="dark:invert"
                  src="/herceptin-logo.png"
                  alt="Vercel logomark"
                  width={50}
                  height={50}
                />
              </div>
              {/* <div className="ml-4">STRONGER TOGETHER</div> */}
              <Image
                className="dark:invert"
                src="/title.png"
                alt="stronger together"
                width={300}
                height={50}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-1">
            <ScrollArea className="h-[calc(100vh-300px)]">
              {transcription.map((entry, index) => (
                <div key={index} className={`mb-2 ${entry.color} text-justify`}>
                  <strong>{entry.speaker}:</strong> {entry.text}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-start gap-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Consent for Recording</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Consent for Recording</DialogTitle>
                  <DialogDescription>
                    Please provide your consent for recording and transcribing
                    this meeting.
                  </DialogDescription>
                </DialogHeader>
                <RadioGroup
                  defaultValue="no"
                  onValueChange={handleConsentChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes, I consent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No, I do not consent</Label>
                  </div>
                </RadioGroup>
                <DialogFooter>
                  <Button onClick={sendSignedConsent}>
                    Send Signed Consent
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "default"}
            >
              {isRecording ? (
                <MicOff className="mr-2 h-4 w-4" />
              ) : (
                <Mic className="mr-2 h-4 w-4" />
              )}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
            <Button variant="outline">Suggest Corrections</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Summarize</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>
                    {`Summary of out meeting on   ${Intl.DateTimeFormat(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    ).format(new Date())},   in Zug`}
                  </DialogTitle>
                </DialogHeader>
                <Textarea
                  placeholder="Add action items or follow-ups here..."
                  value={meetingSummary}
                  onChange={(e) => setMeetingSummary(e.target.value)}
                  className="min-h-[200px]"
                />
                <DialogFooter>
                  <Button>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={toggleSideMenu}
              className={`absolute rounded-full w-[30px] h-[30px] top-[300px] right-[-20px]`}
            >
              {/* {showSideMenu ? <span>X</span> : <span>&#8801;</span>} */}
              {showSideMenu ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </CardFooter>
        </Card>
      </div>
      {showSideMenu && (
        <div className={"w-1/3"}>
          <Tabs
            defaultValue="ideas"
            className="flex flex-row-reverse w-full max-w-4xl mx-auto"
          >
            <TabsList className="flex flex-col justify-start h-auto space-y-2 ml-4 bg-gray-100">
              <TabsTrigger value="ideas">
                <Image
                  className="dark:invert ml-2"
                  src="/ideas.png"
                  alt="Ideas icon"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
              <TabsTrigger value="voting">
                <Image
                  className="dark:invert ml-2"
                  src="/voting.png"
                  alt="Voting icon"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
              <TabsTrigger value="whiteboard">
                <Image
                  className="dark:invert ml-2"
                  src="/whiteboard.png"
                  alt="Whiteboard icon"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
              <TabsTrigger value="chatbot">
                <Image
                  className="dark:invert ml-2"
                  src="/chatbot.png"
                  alt="Chatbot icon"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
              <TabsTrigger value="meeting-management">
                <Image
                  className="dark:invert ml-2"
                  src="/meeting-management.png"
                  alt="Meeting Management icon"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
              <TabsTrigger value="stay-in-touch">
                <Image
                  className="dark:invert ml-2"
                  src="/stay-in-touch.png"
                  alt="Stay in Touch icon"
                  width={20}
                  height={20}
                />
              </TabsTrigger>
            </TabsList>
            <div className="flex-col">
              <TabsContent value="ideas" className="w-[300px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Idea Sharing</CardTitle>
                    <CardDescription>
                      Contribute your thoughts to the discussion
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Share your idea here..."
                      className="h-[200px]"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Thank you",
                          description: "Your idea is noted.",
                        });
                      }}
                    >
                      <Send className="mr-2 h-4 w-4" /> Share Idea
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="voting" className="w-[300px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Polls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-2 rounded px-2 py-4">
                        <p className="font-medium">
                          What’s the most important factor for you when
                          considering a new treatment—effectiveness, side
                          effects, or the speed of administration?
                        </p>
                        <div className="mt-2">
                          <Button variant="outline">Answer 1</Button>
                          <Button variant="outline">Answer 2</Button>
                          <Button variant="outline">Answer 3</Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 mt-2">
                      <div className="border-2 rounded px-2 py-4">
                        <p className="font-medium">
                          What is one thing you wish more people understood
                          about your condition?
                        </p>
                        <div className="space-y-2 mt-2">
                          <Button variant="outline">Answer 1</Button>
                          <Button variant="outline">Answer 2</Button>
                          <Button variant="outline">Answer 3</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="whiteboard" className="w-[300px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Whiteboard</CardTitle>
                    <CardDescription>
                      An exercise where everyone shares one word to capture what
                      they value most in healthcare. Such as <br />- Trust
                      <br />- Compassion <br /> - Access
                      <br /> - Innovation <br /> - Support
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white h-32 border border-gray-200 rounded-md"></div>
                  </CardContent>
                  <CardFooter>
                    <Button>Open Full Whiteboard</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="chatbot" className="w-[300px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Ask Gen-Bot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add chatbot content here */}
                    <p>Some have asked me questions like...</p>
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center border-2 px-2 py-2 mt-4 cursor-pointer"
                        onClick={() => {
                          toast({
                            title: "Suggestion Used",
                            description:
                              "The AI suggestion has been added to your notes.",
                          });
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="meeting-management" className="w-[300px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Meeting Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-[250px]">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Transcription
                    </Button>
                    <Button variant="outline" className="w-[250px] mt-2">
                      <Share2 className="mr-2 h-4 w-4" /> Share with Colleagues
                    </Button>
                    <Button variant="outline" className="w-[250px] mt-2">
                      <Calendar className="mr-2 h-4 w-4" /> Schedule Follow-up
                    </Button>
                    <Button variant="outline" className="w-[250px] mt-2">
                      <Gift className="mr-2 h-4 w-4" /> Send Thank You Goodies
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="stay-in-touch" className="w-[300px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Stay In Touch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-around">
                      <Button variant="outline" size="icon">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
}
