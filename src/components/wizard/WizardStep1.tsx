import React, { useState, useMemo } from "react";
import { useWizard } from "@/context/WizardContext";
import { WizardShell } from "./WizardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALL_LANGUAGES, POPULAR_LANGUAGES } from "@/types/auth";

const WizardStep1: React.FC = () => {
  const { formData, updateFormData, nextStep } = useWizard();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = ALL_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query)
    );
    return filtered;
  }, [searchQuery]);

  const popularLanguages = POPULAR_LANGUAGES.filter((lang) => {
    const query = searchQuery.toLowerCase();
    return (
      lang.name.toLowerCase().includes(query) ||
      lang.code.toLowerCase().includes(query)
    );
  });

  const otherLanguages = filteredLanguages.filter(
    (lang) => !POPULAR_LANGUAGES.find((p) => p.code === lang.code)
  );

  const handleSelectLanguage = (code: string) => {
    updateFormData({ targetLanguage: code });
  };

  const handleContinue = () => {
    if (formData.targetLanguage) {
      nextStep();
    }
  };

  const selectedLanguage = ALL_LANGUAGES.find(
    (lang) => lang.code === formData.targetLanguage
  );

  return (
    <WizardShell
      stepTitle="Which language do you want to learn?"
      stepDescription="Choose from 100+ languages. You can change this later."
      showBack={false}
      showSkip={true}
      onSkip={nextStep}
    >
      <div className="space-y-6">
        {/* Search */}
        <div>
          <Input
            placeholder="Search languages (e.g., Spanish, Français, 日本語)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10"
          />
        </div>

        {/* Popular Languages Section */}
        {!searchQuery && popularLanguages.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ⭐ Popular
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {POPULAR_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    formData.targetLanguage === lang.code
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="text-3xl mb-2">{lang.flag}</div>
                  <p className="text-sm font-medium">{lang.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* All Languages / Search Results */}
        {(searchQuery || filteredLanguages.length > 0) && (
          <div className="space-y-3">
            {searchQuery && <p className="text-sm text-muted-foreground">{filteredLanguages.length} results</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-2">
              {(searchQuery ? filteredLanguages : ALL_LANGUAGES).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    formData.targetLanguage === lang.code
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <p className="text-xs font-medium">{lang.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Native Language Selector */}
        <div className="p-4 rounded-lg bg-secondary/30 border border-border space-y-2">
          <Label htmlFor="nativeLanguage" className="text-sm">
            My native language is
          </Label>
          <Select
            value={formData.nativeLanguage}
            onValueChange={(value) => updateFormData({ nativeLanguage: value })}
          >
            <SelectTrigger id="nativeLanguage">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Continue Button */}
        <div className="flex gap-3">
          <Button
            onClick={handleContinue}
            disabled={!formData.targetLanguage}
            size="lg"
            className="flex-1"
          >
            Continue → {selectedLanguage ? selectedLanguage.flag : ""}
          </Button>
        </div>
      </div>
    </WizardShell>
  );
};

export default WizardStep1;
