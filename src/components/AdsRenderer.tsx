import React, { useEffect, useState } from 'react';
import { ExternalLink, Info, Activity, MousePointerClick, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export interface AdCampaign {
  id: string;
  name: string;
  type: 'google_ads' | 'banner' | 'sidebar' | 'native';
  placement: string; // e.g., "blog_top", "sidebar_widget", "inline_feed", "footer_wide"
  status: 'Active' | 'Paused' | 'Ended';
  impressions: number;
  clicks: number;
  ctr: number;
  earnings: number;
  cpc: number;
  cpm: number;
  targetUrl: string;
  imageUrl?: string;
  sponsorName?: string;
  sponsorDescription?: string;
  googleAdClient?: string;
  googleAdSlot?: string;
  startDate: string;
  endDate: string;
}

const DEFAULT_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'ad-g1',
    name: 'Google Ads Auto Banner',
    type: 'google_ads',
    placement: 'blog_top',
    status: 'Active',
    impressions: 14850,
    clicks: 312,
    ctr: 2.1,
    earnings: 140.40,
    cpc: 0.45,
    cpm: 2.50,
    targetUrl: 'https://google.com/adsense',
    googleAdClient: 'ca-pub-8612345678908686',
    googleAdSlot: '9876543210',
    startDate: '2026-01-01',
    endDate: '2026-12-31'
  },
  {
    id: 'ad-b1',
    name: 'Elijah Premium Accounting Upgrade',
    type: 'banner',
    placement: 'blog_top',
    status: 'Active',
    impressions: 6200,
    clicks: 184,
    ctr: 2.9,
    earnings: 82.80,
    cpc: 0.45,
    cpm: 3.20,
    targetUrl: '/membership',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-06-01',
    endDate: '2026-09-30'
  },
  {
    id: 'ad-s1',
    name: 'ESA Accounting Academy Discount',
    type: 'sidebar',
    placement: 'sidebar_widget',
    status: 'Active',
    impressions: 4300,
    clicks: 125,
    ctr: 2.9,
    earnings: 62.50,
    cpc: 0.50,
    cpm: 2.00,
    targetUrl: '/academy',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
    startDate: '2026-05-15',
    endDate: '2026-11-15'
  },
  {
    id: 'ad-n1',
    name: 'Standard Chartered Corporate Venture Capital',
    type: 'native',
    placement: 'inline_feed',
    status: 'Active',
    impressions: 8900,
    clicks: 340,
    ctr: 3.8,
    earnings: 204.00,
    cpc: 0.60,
    cpm: 4.00,
    targetUrl: '/contact',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    sponsorName: 'بنك ستاندرد تشارترد مصر',
    sponsorDescription: 'احصل على تسهيلات ائتمانية وتمويل شركات مرن بفائدة تنافسية لعام 2026 لدعم توسع مكاتب المراجعة والمؤسسات.',
    startDate: '2026-03-10',
    endDate: '2026-10-25'
  }
];

export function getStoredCampaigns(): AdCampaign[] {
  if (typeof window === 'undefined') return DEFAULT_CAMPAIGNS;
  const stored = localStorage.getItem('admin_ad_campaigns');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_CAMPAIGNS;
    }
  }
  localStorage.setItem('admin_ad_campaigns', JSON.stringify(DEFAULT_CAMPAIGNS));
  return DEFAULT_CAMPAIGNS;
}

export function saveStoredCampaigns(campaigns: AdCampaign[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_ad_campaigns', JSON.stringify(campaigns));
  }
}

interface AdsRendererProps {
  type?: 'google_ads' | 'banner' | 'sidebar' | 'native';
  placement?: string;
  isRtl?: boolean;
  className?: string;
}

export default function AdsRenderer({ type, placement, isRtl = true, className }: AdsRendererProps) {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [activeAd, setActiveAd] = useState<AdCampaign | null>(null);

  useEffect(() => {
    // Load campaigns and trigger an impression
    const loaded = getStoredCampaigns();
    setCampaigns(loaded);

    // Find first matching active ad campaign
    const matches = loaded.filter(c => {
      if (c.status !== 'Active') return false;
      if (type && c.type !== type) return false;
      if (placement && c.placement !== placement) return false;
      return true;
    });

    if (matches.length > 0) {
      // Pick a random matching campaign for dynamic rotation
      const selected = matches[Math.floor(Math.random() * matches.length)];
      setActiveAd(selected);

      // Increment impression count in localStorage
      const updated = loaded.map(c => {
        if (c.id === selected.id) {
          const nextImp = c.impressions + 1;
          const nextEarnings = c.earnings + (c.cpm / 1000);
          const nextCtr = nextImp > 0 ? Number(((c.clicks / nextImp) * 100).toFixed(2)) : 0;
          return {
            ...c,
            impressions: nextImp,
            earnings: Number(nextEarnings.toFixed(4)),
            ctr: nextCtr
          };
        }
        return c;
      });
      saveStoredCampaigns(updated);
    }
  }, [type, placement]);

  const handleAdClick = () => {
    if (!activeAd) return;
    
    // Increment clicks and trigger redirect
    const loaded = getStoredCampaigns();
    const updated = loaded.map(c => {
      if (c.id === activeAd.id) {
        const nextClicks = c.clicks + 1;
        const nextEarnings = c.earnings + c.cpc;
        const nextCtr = c.impressions > 0 ? Number(((nextClicks / c.impressions) * 100).toFixed(2)) : 0;
        return {
          ...c,
          clicks: nextClicks,
          earnings: Number(nextEarnings.toFixed(4)),
          ctr: nextCtr
        };
      }
      return c;
    });
    saveStoredCampaigns(updated);

    // Track analytics event locally if desired, or open target url
    if (activeAd.targetUrl.startsWith('http') || activeAd.targetUrl.startsWith('https')) {
      window.open(activeAd.targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Handle SPA navigation
      window.location.href = activeAd.targetUrl;
    }
  };

  if (!activeAd) return null;

  // --- RENDERING TYPES ---

  // 1. GOOGLE ADS BLOCK (Responsive, matches standard Adsense layouts)
  if (activeAd.type === 'google_ads') {
    return (
      <div 
        id={`g-ads-${activeAd.id}`}
        className={cn(
          "w-full bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 p-4 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-center",
          className
        )}
      >
        <div className="absolute top-1 right-2 flex items-center gap-1 text-[8px] text-slate-400 font-bold tracking-wider">
          <Info className="w-2.5 h-2.5 text-cyan-500" />
          <span>{isRtl ? "إعلان من Google" : "Ads by Google"}</span>
        </div>

        <div className="space-y-1 my-3">
          <p className="text-[10px] font-black font-mono text-slate-400">
            {activeAd.googleAdClient} | Slot: {activeAd.googleAdSlot}
          </p>
          <p className="text-xs font-black text-slate-500 dark:text-slate-400">
            {isRtl ? "مساحة إعلانية مستجابة ممولة تلقائياً" : "Responsive Auto-Optimized Ad Unit"}
          </p>
          <span className="inline-block px-2 py-0.5 bg-yellow-400 text-slate-950 rounded text-[9px] font-extrabold uppercase mt-1 tracking-widest">
            AdSense
          </span>
        </div>

        <button 
          onClick={handleAdClick}
          className="mt-1 text-[10px] text-indigo-500 hover:text-indigo-600 font-black flex items-center gap-1 cursor-pointer border-none bg-transparent"
        >
          <span>{isRtl ? "تفاعل مع العرض المالي" : "Interact with offer"}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    );
  }

  // 2. BANNER AD (Header, footer, or blog wide horizontal banner)
  if (activeAd.type === 'banner') {
    return (
      <div 
        id={`banner-ad-${activeAd.id}`}
        onClick={handleAdClick}
        className={cn(
          "w-full rounded-2xl overflow-hidden shadow-md cursor-pointer border border-slate-200 dark:border-slate-800 relative group",
          className
        )}
      >
        <div className="absolute top-2 right-2 z-10 bg-black/70 text-[8px] text-white font-extrabold px-1.5 py-0.5 rounded tracking-widest uppercase">
          {isRtl ? "إعلان ممول" : "Sponsor Ad"}
        </div>

        <div className="relative aspect-[16/5] sm:aspect-[21/6] overflow-hidden bg-slate-100 dark:bg-slate-950">
          {activeAd.imageUrl ? (
            <img 
              src={activeAd.imageUrl} 
              alt={activeAd.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-black text-slate-400 text-xs">
              {activeAd.name}
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 flex flex-col justify-end p-4">
            <h4 className="text-white text-xs sm:text-sm font-black leading-tight drop-shadow-sm mb-1">
              {activeAd.name}
            </h4>
            <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-black">
              <span>{isRtl ? "اكتشف المزيد والمزايا الآن" : "Learn more & register now"}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. SIDEBAR AD (Square/vertical column banner widget)
  if (activeAd.type === 'sidebar') {
    return (
      <div 
        id={`sidebar-ad-${activeAd.id}`}
        onClick={handleAdClick}
        className={cn(
          "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs cursor-pointer relative overflow-hidden group space-y-3.5",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="text-[9px] text-indigo-500 font-black tracking-wider uppercase flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>{isRtl ? "موصى به لك" : "Recommended Offer"}</span>
          </span>
          <span className="bg-slate-100 dark:bg-slate-850 text-[8px] text-slate-400 px-1 py-0.5 rounded font-black">
            {isRtl ? "إعلان" : "SPONSOR"}
          </span>
        </div>

        {activeAd.imageUrl && (
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative bg-slate-100">
            <img 
              src={activeAd.imageUrl} 
              alt={activeAd.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="space-y-1">
          <h4 className="text-slate-900 dark:text-white font-black text-xs leading-snug group-hover:text-indigo-500 transition-colors">
            {activeAd.name}
          </h4>
          <p className="text-[10px] text-slate-400 font-bold">
            {isRtl ? "انقر لاستكشاف العروض والبرامج التدريبية المتاحة." : "Click to view dynamic professional services available."}
          </p>
        </div>

        <div className="w-full py-2 bg-slate-50 dark:bg-slate-950 text-center rounded-xl text-[10px] text-indigo-500 dark:text-cyan-400 font-black flex items-center justify-center gap-1 border border-slate-150 dark:border-slate-800 transition-all group-hover:bg-indigo-600 group-hover:text-white">
          <MousePointerClick className="w-3.5 h-3.5 shrink-0" />
          <span>{isRtl ? "انقر للمشاهدة" : "Click to visit site"}</span>
        </div>
      </div>
    );
  }

  // 4. NATIVE AD (Styled identically to content feed items, integrates into stream)
  return (
    <div 
      id={`native-ad-${activeAd.id}`}
      onClick={handleAdClick}
      className={cn(
        "bg-linear-to-br from-indigo-50/50 via-white to-indigo-50/20 dark:from-indigo-950/20 dark:via-slate-900 dark:to-indigo-950/5 border border-indigo-100 dark:border-indigo-950/40 p-5 rounded-3xl shadow-xs cursor-pointer relative overflow-hidden group flex flex-col md:flex-row gap-5",
        className
      )}
    >
      <div className="absolute top-2.5 right-2.5 z-10 bg-indigo-600 text-[8px] text-white font-black px-2 py-0.5 rounded-full tracking-wider uppercase flex items-center gap-1 shadow-sm">
        <ShieldCheck className="w-2.5 h-2.5 animate-pulse" />
        <span>{isRtl ? "مستشار مرخص" : "Sponsor Post"}</span>
      </div>

      {activeAd.imageUrl && (
        <div className="w-full md:w-44 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0">
          <img 
            src={activeAd.imageUrl} 
            alt={activeAd.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <p className="text-[10px] text-indigo-600 dark:text-cyan-400 font-black uppercase tracking-widest">
            {activeAd.sponsorName || (isRtl ? "إعلان موجه" : "Sponsored Advisory")}
          </p>
          <h4 className="text-slate-900 dark:text-white font-black text-xs sm:text-sm leading-snug group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
            {activeAd.name}
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            {activeAd.sponsorDescription || (isRtl ? "خدمات مالية واقراض تجاري موائم للمعايير المحاسبية المعتمدة." : "Tailored enterprise development matches approved corporate workflows.")}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-indigo-100/40 dark:border-slate-800">
          <span className="w-6 h-6 bg-indigo-100 dark:bg-indigo-950 rounded-full flex items-center justify-center text-[10px] font-black text-indigo-600 dark:text-cyan-400 uppercase">
            Ad
          </span>
          <div className="text-[10px]">
            <p className="text-slate-800 dark:text-slate-200 font-bold">{activeAd.sponsorName || "Elijah Partner"}</p>
            <p className="text-slate-400 font-bold text-[8px]">{isRtl ? "رابط خارجي معتمد" : "Verified external portal"}</p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 ms-auto group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
