export interface ScenePerspective {
  title: string;
  subtitle: string;
  sectionId?: string; // Optional ID to link with navigation
  links?: string[]; // Optional array of links related to the perspective
  position:
    | 'top'
    | 'top-left'
    | 'left'
    | 'right'
    | 'center'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
  camera: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number }; // in radians
  scrollProgress: { start: number; end: number }; // percentage 0-100
  hideText?: boolean; // Added flag to hide text for transition sections
}

/**
 * Scene perspectives data defining camera positions, targets, and text for each section of the scroll animation. Each perspective includes a title, subtitle, position for text placement, camera coordinates, target coordinates, optional rotation, and scroll progress range. The hideText flag can be used to hide text during transition sections where no titles are desired. This data is used to drive the cinematic scroll animations in the showcase component.
 */
export const scenePerspectives: ScenePerspective[] = [
  {
    title: 'ALYSSA DAI',
    subtitle: 'Future UX Architect',
    position: 'center',
    sectionId: 'home',
    camera: { x: 0, y: 2, z: 10 },
    target: { x: 0, y: 5, z: 0 },
    scrollProgress: { start: 0, end: 11.9 },
  },
  {
    title: 'Curriculum Vitae',
    subtitle: 'Feel free to take a look at my latest CV',
    sectionId: 'cv',
    position: 'left',
    camera: { x: 3, y: 8, z: 10 },
    target: { x: 0, y: 10, z: 0 },
    scrollProgress: { start: 11.9, end: 23.7 },
  },
  {
    title: 'Projects',
    subtitle: 'Gander around and see all my projects',
    position: 'right',
    sectionId: 'projects',
    camera: { x: -10, y: 15, z: 0 },
    target: { x: 0, y: 15, z: 0 },
    scrollProgress: { start: 23.7, end: 35.6 },
  },
  {
    title: 'Newsletters',
    subtitle: 'Subscribe to my newsletters so you don\'t miss my updates',
    sectionId: 'newsletter',
    position: 'top-left',
    camera: { x: -10, y: 22, z: 0 },
    target: { x: 0, y: 25, z: 0 },
    scrollProgress: { start: 35.6, end: 45.8 },
  },
  {
    title: '',
    subtitle: '',
    position: 'top-right',
    camera: { x: 5, y: 35, z: 5 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 45.8, end: 52.5 },
    hideText: true,
  },
  {
    title: 'Email',
    subtitle: 'alyssadai@alyssa.com',
    sectionId: 'contact',
    position: 'center',
    camera: { x: 5, y: 30, z: 10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 52.5, end: 62.7 },
  },
  {
    title: 'Github',
    subtitle: 'Check out my github for more projects and code samples',
    position: 'bottom-right',
    camera: { x: 5, y: 25, z: 10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 62.7, end: 69.5 },
  },
  {
    title: 'Google Scholar',
    subtitle: 'Want to collaborate on a research?',
    position: 'bottom-left',
    camera: { x: 15, y: 20, z: 5 },
    target: { x: 0, y: 24, z: 0 },
    scrollProgress: { start: 69.5, end: 77.9 },
  },
  {
    title: 'Community',
    subtitle: 'Find me and my community in Discord',
    position: 'top',
    camera: { x: 25, y: 15, z: 0 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 77.9, end: 84.7 },
  },
  {
    title: 'Thank you',
    subtitle: 'See you around and thanks for stopping by.',
    position: 'center',
    camera: { x: 20, y: 20, z: -10 },
    target: { x: 0, y: 20, z: 0 },
    scrollProgress: { start: 84.7, end: 100 },
  },
];
