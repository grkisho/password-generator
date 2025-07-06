"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export default function Home() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);

  const passwordRef = useRef<HTMLInputElement>(null);

  const generatePassword = useCallback(() => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?";

    if (charset.length === 0) {
      setPassword("");
      alert("Please select at least one character type (letters, numbers, or symbols).");
      return;
    }

    let generatedPass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPass += charset[randomIndex];
    }
    setPassword(generatedPass);
  }, [length, includeNumbers, includeSymbols]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999); // For mobile devices
    if (password) {
      window.navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    }
  }, [password]);

  // Generate password on initial render and when dependencies change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="flex flex-col justify-center items-center bg-[#1B133F] p-4 min-h-screen">
      <h1 className="mb-1 font-bold text-white text-3xl text-center">Password Generator</h1>
      <p className="mb-4 text-white text-sm">Create strong passwords with Password Generator</p>
      <div className="bg-linear-to-b from-[#37247F] to-[#1B133F] shadow-lg p-8 rounded-lg w-full max-w-md text-white">
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
            className="flex-grow p-3 text-green-400 text-xl"
            placeholder="Generated Password"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-[#6D49FF] hover:bg-[#4A2DC4] px-6 py-1.5 rounded-full font-semibold text-white transition-colors duration-200"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="length">
              <span>{length}</span> characters
            </label>
            <input
              type="range"
              id="length"
              min="6"
              max="30"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-1/2 accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="numbers" className="cursor-pointer">
              Numbers
            </label>
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
              className="w-5 h-5 accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="symbols" className="cursor-pointer">
              Symbols
            </label>
            <input
              type="checkbox"
              id="symbols"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols((prev) => !prev)}
              className="w-5 h-5 accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="bg-[#0ad7a4] mt-8 py-2 rounded-md w-full font-semibold text-white transition-colors duration-200"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}
