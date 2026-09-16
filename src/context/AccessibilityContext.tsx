import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings, TextSizeMode } from '@/types';

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  largerText: false,
  textSize: 'default',
  highContrast: false,
  reducedMotion: false,
  comfortableSpacing: false,
  simpleInterface: false,
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  updateSettings: (partial: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
  isSimpleMode: boolean;
  textSize: TextSizeMode;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const stored = localStorage.getItem('farmlink_accessibility');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_ACCESSIBILITY_SETTINGS,
          ...parsed,
          textSize: parsed.textSize || (parsed.largerText ? 'larger' : 'default'),
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_ACCESSIBILITY_SETTINGS;
  });

  // Sync to document.documentElement and body classes for immediate CSS styling
  useEffect(() => {
    try {
      localStorage.setItem('farmlink_accessibility', JSON.stringify(settings));
    } catch {
      // Ignore
    }

    const root = document.documentElement;
    const body = document.body;

    // 1. Text Size
    const currentSize = settings.textSize || (settings.largerText ? 'larger' : 'default');
    root.setAttribute('data-text-size', currentSize);
    root.setAttribute('data-larger-text', String(currentSize !== 'default'));
    if (currentSize !== 'default') {
      body.classList.add('larger-text-mode');
    } else {
      body.classList.remove('larger-text-mode');
    }

    // 2. High Contrast
    root.setAttribute('data-high-contrast', String(settings.highContrast));
    if (settings.highContrast) {
      body.classList.add('high-contrast-mode');
    } else {
      body.classList.remove('high-contrast-mode');
    }

    // 3. Reduced Motion
    root.setAttribute('data-reduced-motion', String(settings.reducedMotion));
    if (settings.reducedMotion) {
      body.classList.add('reduced-motion-mode');
    } else {
      body.classList.remove('reduced-motion-mode');
    }

    // 4. Comfortable Spacing
    root.setAttribute('data-comfortable-spacing', String(!!settings.comfortableSpacing));

    // 5. Simple Interface Mode
    root.setAttribute('data-simple-interface', String(settings.simpleInterface));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'textSize') {
        next.largerText = value !== 'default';
      }
      return next;
    });
  };

  const updateSettings = (partial: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      if (partial.textSize !== undefined) {
        next.largerText = partial.textSize !== 'default';
      }
      return next;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettings,
        resetSettings,
        isSimpleMode: settings.simpleInterface,
        textSize: settings.textSize || 'default',
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
