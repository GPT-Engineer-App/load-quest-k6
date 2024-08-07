import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Paw, Star, ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [catFacts, setCatFacts] = useState([]);
  const [likeData, setLikeData] = useState([]);

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/False_alarm_-a_Flickr.jpg/1200px-False_alarm_-a_Flickr.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
        setProgress(0);
      }
    }, 5000);

    const progressInterval = setInterval(() => {
      if (!isHovering) {
        setProgress((prevProgress) => (prevProgress + 1) % 100);
      }
    }, 50);

    // Fetch cat facts
    fetch('https://cat-fact.herokuapp.com/facts')
      .then(response => response.json())
      .then(data => setCatFacts(data.map(fact => fact.text).slice(0, 5)));

    // Generate mock like data
    const mockLikeData = Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      likes: Math.floor(Math.random() * 100)
    }));
    setLikeData(mockLikeData);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isHovering]);

  const handleLike = () => {
    setLikes(likes + 1);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + catImages.length) % catImages.length);
    setProgress(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    setProgress(0);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-200 to-pink-200">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-bold mb-4 text-purple-800 inline-flex items-center">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block"
            >
              <Paw className="inline-block mr-4 text-pink-500" size={64} />
            </motion.span>
            Purrfect Cat World
          </h1>
          <p className="text-2xl text-purple-600">Discover the Fascinating World of Felines</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                src={catImages[currentImageIndex]}
                alt="Cute cat" 
                className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <motion.div 
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="outline" size="icon" onClick={handlePrevImage}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div 
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="outline" size="icon" onClick={handleNextImage}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {catImages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-300'}`}
                  initial={{ scale: 1 }}
                  animate={{ scale: index === currentImageIndex ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Capture the moment!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </motion.div>
          <div className="flex flex-col justify-between">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-700">Cat Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {catFacts.map((fact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {fact}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-700">Cat Love Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={likeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
        </div>

        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-4"
            >
              <Alert>
                <Star className="h-4 w-4" />
                <AlertTitle>Thank you!</AlertTitle>
                <AlertDescription>
                  Your love for cats has been recorded. Keep spreading the joy!
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="characteristics" className="text-lg">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds" className="text-lg">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card className="border-2 border-purple-300">
              <CardHeader>
                <CardTitle className="flex items-center text-3xl text-purple-700">
                  <Info className="mr-2" /> Characteristics of Cats
                </CardTitle>
                <CardDescription className="text-xl">What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Independent nature",
                    "Excellent hunters with sharp claws and teeth",
                    "Flexible bodies and quick reflexes",
                    "Keen senses, especially hearing and night vision",
                    "Communicate through vocalizations, body language, and scent",
                    "Self-grooming and cleanliness"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center text-lg bg-purple-100 p-4 rounded-lg shadow"
                    >
                      <Cat className="mr-3 text-purple-600" size={24} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card className="border-2 border-pink-300">
              <CardHeader>
                <CardTitle className="flex items-center text-3xl text-pink-700">
                  <Cat className="mr-2" /> Popular Cat Breeds
                </CardTitle>
                <CardDescription className="text-xl">Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { breed: "Siamese", description: "Known for their distinctive coloring and vocal nature" },
                    { breed: "Maine Coon", description: "Large, fluffy cats with tufted ears" },
                    { breed: "Persian", description: "Recognizable by their flat faces and long, luxurious coats" },
                    { breed: "Bengal", description: "Wild-looking cats with leopard-like spots" },
                    { breed: "Scottish Fold", description: "Characterized by their folded ears" },
                    { breed: "Sphynx", description: "Hairless cats known for their wrinkled skin" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-pink-100 p-4 rounded-lg shadow"
                    >
                      <strong className="text-pink-700 text-xl block mb-2">{item.breed}</strong>
                      <p className="text-lg">{item.description}</p>
                      <Badge variant="secondary" className="mt-2">Popular</Badge>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleLike}
              className="bg-pink-500 hover:bg-pink-600 text-2xl py-8 px-12 rounded-full shadow-lg"
            >
              <Heart className="mr-3" size={32} /> Show Cat Love ({likes})
            </Button>
          </motion.div>
          <p className="mt-4 text-lg text-purple-700">Share your love for these amazing creatures!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
