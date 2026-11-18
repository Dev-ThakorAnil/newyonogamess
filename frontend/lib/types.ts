export interface Game {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  logo: string;
  screenshots: string[];
  category: string;
  tags: string[];
  version: string;
  size: string;
  downloads: number;
  rating: number;
  downloadUrl?: string;
  referralUrl?: string;
  bonus: string;
  featured: boolean;
  trending: boolean;
  seoTitle: string;
  seoDescription: string;
  faq: { question: string; answer: string }[];
  howToDownload: string;
  contentSections?: {
    aboutGame?: { visible: boolean; content: string };
    keyFeatures?: { visible: boolean; content: string };
    systemRequirements?: { visible: boolean; content: string };
    whyChoose?: { visible: boolean; content: string };
    safetyAndSecurity?: { visible: boolean; content: string };
  };
  isNewGame?: boolean;
  isComingSoon?: boolean;
  releaseDate?: string | null;
  isActive: boolean;
  gameType?: 'diwa' | 'yono';
  position?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  gameCount: number;
}

export interface DownloadStats {
  totalDownloads: number;
  recentDownloads: number;
  topGames: { _id: string; count: number }[];
  dailyStats: { _id: string; count: number }[];
}

export interface DashboardData {
  totalGames: number;
  totalDownloads: number;
  topGames: Game[];
  recentGames: Game[];
  categories: Category[];
  activeSessions: number;
}

export interface PaginatedResponse<T> {
  games: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

