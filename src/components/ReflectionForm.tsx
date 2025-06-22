import React from "react";
import { Textarea, Slider, Button, Card } from "@/components/ui";

interface ReflectionFormProps {
  text: string;
  onTextChange: (text: string) => void;
  balance: number;
  onBalanceChange: (balance: number) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const ReflectionForm: React.FC<ReflectionFormProps> = ({
  text,
  onTextChange,
  balance,
  onBalanceChange,
  onSubmit,
  loading
}) => {
  return (
    <Card variant="elevated" className="w-full max-w-xl p-6">
      <h1 className="text-2xl font-light text-gray-700 mb-6">
        What quiet thought would you like to share?
      </h1>

      <Textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        rows={6}
        placeholder="Type anything…"
        className="mb-6"
      />

      <div className="mb-6">
        <Slider
          value={balance}
          onChange={onBalanceChange}
          leftLabel="Soft Validation"
          rightLabel="Action-Oriented"
        />
      </div>

      <Button
        onClick={onSubmit}
        disabled={!text.trim()}
        loading={loading}
        className="w-full"
        size="lg"
      >
        Reflect Quietly
      </Button>
    </Card>
  );
}; 