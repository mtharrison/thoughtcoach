export interface DistortionSection {
  heading: string;
  body: string;
}

export interface DistortionProps {
  name: string;
  link: string;
  color: string;
  sections: DistortionSection[];
  spans?: string[];
}

export interface DistortionsProps {
  distortions: DistortionProps[];
}

export interface DistortionConfig {
  description: string;
  example: string;
  color: string;
  link: string;
}

export interface DistortionsConfig {
  [key: string]: DistortionConfig;
}

export interface DistortionsResponse {
  distortions: {
    [key: string]: {
      spans: string[];
      info: string;
      reframe: string;
      confidence: number;
    };
  };
  advice: string;
}

export interface ClassificationResponse {
  classification: 'balanced' | 'distorted' | 'invalid';
  reasoning: string;
}

export type AnalyseResponse = ClassificationResponse | DistortionsResponse;
