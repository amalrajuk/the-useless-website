"use client";

import React, { useState, useEffect } from "react";
import { Delete, History } from "lucide-react";
import { playSound } from "@/lib/sound";
import { unlockAchievement, markFeatureExplored } from "@/lib/achievements";

const ABSURD_ANSWERS = [
  "The answer is potato.",
  "Approximately 7 bananas.",
  "Math has left the building.",
  "Your answer is emotionally correct.",
  "Ask a calculator that cares.",
  "Error: Numbers are a social construct.",
  "42, but in lowercase.",
  "Result: NaN (Not a Noodle).",
  "Did you really expect algebra from me?",
  "Infinity, give or take 2.",
  "Calculating... Nah, I don't feel like it.",
  "The square root of sadness.",
  "Result: Three raccoons in a trench coat.",
];

export default function UselessCalculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [isAnswer, setIsAnswer] = useState(false);

  useEffect(() => {
    markFeatureExplored("calculator");
  }, []);

  const handleDigit = (d: string) => {
    playSound("click");
    if (isAnswer) {
      setDisplay(d);
      setIsAnswer(false);
    } else {
      setDisplay((prev) => (prev === "0" ? d : prev + d));
    }
  };

  const handleOperator = (op: string) => {
    playSound("click");
    setIsAnswer(false);
    setDisplay((prev) => prev + " " + op + " ");
  };

  const handleClear = () => {
    playSound("click");
    setDisplay("0");
    setIsAnswer(false);
  };

  const handleDelete = () => {
    playSound("click");
    if (isAnswer) {
      setDisplay("0");
      setIsAnswer(false);
    } else {
      setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    }
  };

  const handleEquals = () => {
    const randomAns = ABSURD_ANSWERS[Math.floor(Math.random() * ABSURD_ANSWERS.length)];
    playSound("wrongBuzzer");
    setHistory((prev) => [display + " = " + randomAns, ...prev.slice(0, 4)]);
    setDisplay(randomAns);
    setIsAnswer(true);

    unlockAchievement("math_defier");
  };

  return (
    <div className="bg-secondary/20 border-4 border-carbon rounded-3xl p-5 sm:p-6 md:p-8 shadow-brutal-lg flex flex-col items-center text-center relative overflow-hidden">
      {/* Header tag */}
      <div className="flex items-center justify-between w-full pb-4 border-b-3 border-carbon mb-5 sm:mb-6">
        <span className="font-mono text-xs font-black uppercase tracking-wider bg-primary text-white px-2.5 py-1 rounded-lg border-2 border-carbon">
          Feature 06: Irrational Arithmetic
        </span>
        <span className="font-mono text-[10px] sm:text-xs font-bold text-carbon/70 uppercase">
          Model: CASIO-DISAPPOINT
        </span>
      </div>

      <h3 className="font-display font-black text-2xl xs:text-3xl md:text-4xl text-carbon uppercase">
        USELESS CALCULATOR
      </h3>
      <p className="font-mono text-xs sm:text-sm font-bold text-carbon/70 mt-1 uppercase">
        Input numbers. Receive philosophical confusion.
      </p>

      {/* The Calculator Body */}
      <div className="my-5 sm:my-6 w-full max-w-sm bg-paper border-4 border-carbon rounded-3xl p-4 sm:p-5 shadow-brutal-xl">
        {/* LCD Screen */}
        <div className="bg-white border-3 border-carbon rounded-2xl p-3.5 sm:p-4 shadow-inner mb-3.5 sm:mb-4 text-right overflow-hidden min-h-[76px] flex flex-col justify-center">
          <div
            className={`font-mono font-black break-words leading-tight transition-all ${
              isAnswer
                ? "text-primary text-xs sm:text-sm md:text-base font-bold text-left"
                : "text-carbon text-xl sm:text-2xl md:text-3xl"
            }`}
          >
            {display}
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear calculator"
            className="py-3 min-h-[48px] bg-red-400 hover:bg-red-500 text-white font-mono font-black text-sm rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            C
          </button>
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Backspace"
            className="py-3 min-h-[48px] bg-sunshine hover:bg-yellow-400 text-carbon font-mono font-black text-sm rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleOperator("%")}
            aria-label="Modulo / percent operator"
            className="py-3 min-h-[48px] bg-white hover:bg-paper text-carbon font-mono font-black text-sm rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            %
          </button>
          <button
            type="button"
            onClick={() => handleOperator("÷")}
            aria-label="Divide operator"
            className="py-3 min-h-[48px] bg-accent text-white hover:bg-accent-hover font-mono font-black text-base rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            ÷
          </button>

          {/* Row 2 */}
          {["7", "8", "9"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigit(num)}
              aria-label={`Digit ${num}`}
              className="py-3 min-h-[48px] bg-white hover:bg-paper text-carbon font-mono font-black text-lg rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleOperator("×")}
            aria-label="Multiply operator"
            className="py-3 min-h-[48px] bg-accent text-white hover:bg-accent-hover font-mono font-black text-base rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            ×
          </button>

          {/* Row 3 */}
          {["4", "5", "6"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigit(num)}
              aria-label={`Digit ${num}`}
              className="py-3 min-h-[48px] bg-white hover:bg-paper text-carbon font-mono font-black text-lg rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleOperator("-")}
            aria-label="Minus operator"
            className="py-3 min-h-[48px] bg-accent text-white hover:bg-accent-hover font-mono font-black text-base rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            -
          </button>

          {/* Row 4 */}
          {["1", "2", "3"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigit(num)}
              aria-label={`Digit ${num}`}
              className="py-3 min-h-[48px] bg-white hover:bg-paper text-carbon font-mono font-black text-lg rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleOperator("+")}
            aria-label="Plus operator"
            className="py-3 min-h-[48px] bg-accent text-white hover:bg-accent-hover font-mono font-black text-base rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            type="button"
            onClick={() => handleDigit("0")}
            aria-label="Digit 0"
            className="col-span-2 py-3 min-h-[48px] bg-white hover:bg-paper text-carbon font-mono font-black text-lg rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => handleDigit(".")}
            aria-label="Decimal dot"
            className="py-3 min-h-[48px] bg-white hover:bg-paper text-carbon font-mono font-black text-lg rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            aria-label="Equals result"
            className="py-3 min-h-[48px] bg-secondary hover:bg-secondary-hover text-carbon font-mono font-black text-xl rounded-xl border-2 border-carbon shadow-brutal-sm active:translate-y-0.5 flex items-center justify-center"
          >
            =
          </button>
        </div>
      </div>

      {/* History of Meaningless Calculations */}
      {history.length > 0 && (
        <div className="w-full max-w-sm bg-white border-2 border-carbon rounded-xl p-3 text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-carbon/60 mb-1">
            <History className="w-3 h-3" />
            <span>Tape of Meaningless Calculations:</span>
          </div>
          <div className="space-y-1 font-mono text-[10px] sm:text-[11px] text-carbon">
            {history.map((item, idx) => (
              <div key={idx} className="truncate border-b border-gray-100 pb-0.5">
                • {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
