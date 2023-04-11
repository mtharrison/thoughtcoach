export interface DistortionSection {
  heading: string;
  body: string;
}

export interface DistortionProps {
  name: string;
  link: string;
  color: string;
  sections: DistortionSection[];
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

export interface AnalyseResponse {
  distortions: {
    why: string;
    info: string;
    reframe: string;
  }[];
}
