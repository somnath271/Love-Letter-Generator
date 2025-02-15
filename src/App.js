import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function LoveLetterGenerator() {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [customMessage, setCustomMessage] = useState("");
  const [letter, setLetter] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [errors, setErrors] = useState({});

  const themes = {
    romantic: `My Dearest ${recipient},

Every moment with you feels like a dream. 
Your smile lights up my world, and your love fills my heart with joy. 
I cherish every second we spend together.

Forever Yours,
${sender}`,
    playful: `Hey Lovebug ${recipient},

Roses are red, violets are blue,
I'm so lucky to have someone as amazing as you! 
Life with you is an adventure.

Hugs & Kisses,
${sender}`,
    poetic: `To my beloved ${recipient},

Like the stars that light the midnight sky,
you shine the brightest in my heart. 
Your love is my melody.

Always,
${sender}`,
    heartfelt: `Dear ${recipient},

You mean the world to me. 
Your kindness and warmth are the greatest gifts.
I love you more than words can express.

With all my love,
${sender}`,
  };

  const generateLetter = () => {
    const newErrors = {};

    if (!sender) newErrors.sender = "Your name is required";
    if (!recipient) newErrors.recipient = "Partner's name is required";
    if (!customMessage)
      newErrors.customMessage = "Personal message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const baseLetter = themes[theme];
    const formattedCustomMessage = customMessage ? `\n${customMessage}` : "";
    setLetter(`${baseLetter}${formattedCustomMessage}`);
    setShowLetter(true);
  };

  const regenerateLetter = () => {
    setCustomMessage("");
    setShowLetter(false);
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 p-4">
      <Card className="w-full max-w-[480px] bg-white rounded-[32px] shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-[28px] font-semibold text-center mb-6 flex items-center justify-center gap-2">
            <span>💌</span> Love Letter Generator
          </h1>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">
                Your Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Your Name"
                value={sender}
                onChange={(e) => {
                  setSender(e.target.value);
                  if (errors.sender) {
                    setErrors({ ...errors, sender: "" });
                  }
                }}
                className={`w-full px-4 py-2.5 rounded-[12px] border ${
                  errors.sender ? "border-red-500" : "border-gray-100"
                } text-gray-600 placeholder:text-gray-400 focus:border-gray-200 focus:ring-0 text-[15px]`}
                required
                aria-required="true"
              />
              {errors.sender && (
                <p className="text-red-500 text-sm mt-1">{errors.sender}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">
                Partner's Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Partner's Name"
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  if (errors.recipient) {
                    setErrors({ ...errors, recipient: "" });
                  }
                }}
                className={`w-full px-4 py-2.5 rounded-[12px] border ${
                  errors.recipient ? "border-red-500" : "border-gray-100"
                } text-gray-600 placeholder:text-gray-400 focus:border-gray-200 focus:ring-0 text-[15px]`}
                required
                aria-required="true"
              />
              {errors.recipient && (
                <p className="text-red-500 text-sm mt-1">{errors.recipient}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">
                Theme <span className="text-red-500">*</span>
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-fit px-4 py-2.5 rounded-[12px] border border-gray-100 text-gray-700 bg-white focus:border-gray-200 focus:ring-0 cursor-pointer text-[15px]"
                required
                aria-required="true"
              >
                <option value="romantic">Romantic</option>
                <option value="playful">Playful</option>
                <option value="poetic">Poetic</option>
                <option value="heartfelt">Heartfelt</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">
                Personal Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Add a personal touch..."
                value={customMessage}
                onChange={(e) => {
                  setCustomMessage(e.target.value);
                  if (errors.customMessage) {
                    setErrors({ ...errors, customMessage: "" });
                  }
                }}
                className={`w-full px-4 py-2.5 rounded-[12px] border ${
                  errors.customMessage ? "border-red-500" : "border-gray-100"
                } text-gray-600 placeholder:text-gray-400 min-h-[100px] focus:border-gray-200 focus:ring-0 text-[15px]`}
                required
                aria-required="true"
              />
              {errors.customMessage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customMessage}
                </p>
              )}
            </div>
            {showLetter ? (
              <div className="space-y-3">
                <div className="mt-4 p-4 bg-pink-100 rounded-[12px]">
                  <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-[15px]">
                    {letter}
                  </p>
                </div>
                <Button
                  onClick={regenerateLetter}
                  className="w-full bg-[#14162F] text-white py-3 rounded-[12px] hover:bg-[#14162F]/90 text-[15px]"
                >
                  Regenerate Letter
                </Button>
              </div>
            ) : (
              <Button
                onClick={generateLetter}
                className="w-full bg-[#14162F] text-white py-3 rounded-[12px] hover:bg-[#14162F]/90 text-[15px]"
              >
                Generate Letter
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
