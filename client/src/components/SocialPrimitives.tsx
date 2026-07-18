import { useState } from "react";

// Each social primitive is fully independent — its own card, its own hover behavior, its own brand treatment.
// Tiger Claw dark/orange aesthetic applied to each platform's identity.

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-[rgba(232,114,42,0.15)] bg-[#111111] p-6 transition-all duration-300 hover:border-[rgba(232,114,42,0.4)] hover:shadow-[0_0_24px_rgba(232,114,42,0.08)] ${className}`}>
    {children}
  </div>
);

// ─── Instagram ─────────────────────────────────────────────────────────────────
export function InstagramPrimitive() {
  const [following, setFollowing] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8722A] via-[#E8722A] to-[#FFB347] flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">INSTAGRAM</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">@tigerclaw.io</p>
        </div>
        <button
          onClick={() => setFollowing(!following)}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 ${
            following
              ? "bg-transparent border border-[#E8722A] text-[#E8722A]"
              : "bg-[#E8722A] text-white hover:bg-[#ff8a3d]"
          }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
      <p className="text-[#b0b0b0] text-xs leading-relaxed font-mono">
        Founder Tigerclaw.io &bull; "The Follow Up" AI Agent &bull; The fortune is in the follow up
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square rounded-lg bg-[#1a1a1a] border border-[rgba(232,114,42,0.1)] flex items-center justify-center">
            <span className="text-[#E8722A] text-xs font-mono opacity-40">Post {i}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── TikTok ────────────────────────────────────────────────────────────────────
export function TikTokPrimitive() {
  const [liked, setLiked] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#E8722A]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.88 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 00-.82-.05A6.34 6.34 0 003.15 15.7a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.4a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.83z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">TIKTOK</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">@brentbryson</p>
        </div>
      </div>
      <div className="aspect-[9/16] max-h-48 rounded-lg bg-[#0a0a0a] border border-[rgba(232,114,42,0.1)] flex items-center justify-center relative overflow-hidden">
        <span className="text-[#E8722A] text-xs font-mono opacity-60">Short-form video</span>
        <div className="absolute right-3 bottom-3 flex flex-col items-center gap-3">
          <button onClick={() => setLiked(!liked)} className="transition-transform active:scale-125">
            <svg className={`w-6 h-6 ${liked ? "text-[#E8722A]" : "text-white"}`} fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </button>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
        </div>
      </div>
    </Card>
  );
}

// ─── Email ─────────────────────────────────────────────────────────────────────
export function EmailPrimitive() {
  const [sent, setSent] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#E8722A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">EMAIL</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">Newsletter / Lead Magnet</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-lg bg-[#0a0a0a] border border-[rgba(232,114,42,0.1)] p-3">
          <p className="text-[#8a8a8a] text-[10px] font-mono uppercase tracking-wider mb-1">Subject</p>
          <p className="text-white text-sm">Your Free AI + Network Marketing Guide</p>
        </div>
        <div className="rounded-lg bg-[#0a0a0a] border border-[rgba(232,114,42,0.1)] p-3">
          <p className="text-[#8a8a8a] text-[10px] font-mono uppercase tracking-wider mb-1">Preview</p>
          <p className="text-[#b0b0b0] text-xs">The fortune is in the follow up. Here's how AI does it for you...</p>
        </div>
        <button
          onClick={() => { setSent(true); setTimeout(() => setSent(false), 2000); }}
          className={`w-full py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 active:scale-[0.97] ${
            sent ? "bg-[#4ADE80] text-black" : "bg-[#E8722A] text-white hover:bg-[#ff8a3d]"
          }`}
        >
          {sent ? "✓ Sent" : "Send Campaign"}
        </button>
      </div>
    </Card>
  );
}

// ─── Facebook ──────────────────────────────────────────────────────────────────
export function FacebookPrimitive() {
  const [liked, setLiked] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#E8722A]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">FACEBOOK</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">Tiger Claw Community</p>
        </div>
      </div>
      <div className="rounded-lg bg-[#0a0a0a] border border-[rgba(232,114,42,0.1)] p-4 mb-3">
        <p className="text-[#b0b0b0] text-sm leading-relaxed">The fortune is in the follow up. Most people quit after 1 attempt. Tiger Claw never stops. 🐯</p>
      </div>
      <div className="flex items-center gap-4 border-t border-[rgba(232,114,42,0.1)] pt-3">
        <button onClick={() => setLiked(!liked)} className={`flex items-center gap-1.5 text-xs font-mono transition-colors ${liked ? "text-[#E8722A]" : "text-[#8a8a8a] hover:text-[#E8722A]"}`}>
          <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
          {liked ? "Liked" : "Like"}
        </button>
        <span className="flex items-center gap-1.5 text-xs font-mono text-[#8a8a8a]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Comment
        </span>
        <span className="flex items-center gap-1.5 text-xs font-mono text-[#8a8a8a]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
          Share
        </span>
      </div>
    </Card>
  );
}

// ─── YouTube ───────────────────────────────────────────────────────────────────
export function YouTubePrimitive() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#E8722A]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">YOUTUBE</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">Brent Bryson</p>
        </div>
        <button
          onClick={() => setSubscribed(!subscribed)}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 ${
            subscribed
              ? "bg-transparent border border-[#8a8a8a] text-[#8a8a8a]"
              : "bg-[#E8722A] text-white hover:bg-[#ff8a3d]"
          }`}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="aspect-video rounded-lg bg-[#0a0a0a] border border-[rgba(232,114,42,0.1)] flex items-center justify-center relative overflow-hidden">
        <div className="w-14 h-14 rounded-full bg-[rgba(232,114,42,0.9)] flex items-center justify-center">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div className="absolute bottom-2 left-3 right-3">
          <div className="h-1 rounded-full bg-[#333] overflow-hidden">
            <div className="h-full w-1/3 bg-[#E8722A] rounded-full" />
          </div>
        </div>
      </div>
      <p className="mt-3 text-white text-sm font-medium">How AI Books Zoom Calls While You Sleep</p>
      <p className="text-[#8a8a8a] text-xs font-mono mt-1">1.2K views &bull; 3 days ago</p>
    </Card>
  );
}

// ─── Threads ───────────────────────────────────────────────────────────────────
export function ThreadsPrimitive() {
  const [liked, setLiked] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#E8722A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.26 1.33-3.017.88-.724 2.104-1.128 3.443-1.137.93-.006 1.79.1 2.571.316-.03-.986-.264-1.748-.7-2.27-.5-.6-1.288-.907-2.342-.916h-.038c-.834 0-1.529.243-2.009.702l-1.36-1.49c.787-.752 1.9-1.15 3.32-1.15h.05c1.63.015 2.87.56 3.684 1.622.734.955 1.113 2.283 1.128 3.942v.2c1.058.525 1.9 1.3 2.444 2.246.76 1.323.893 3.143-.387 5.388-1.79 2.14-4.213 3.1-7.553 3.123zm-1.248-7.498c-.882.046-1.574.322-2.004.8-.38.424-.563.96-.53 1.554.04.72.404 1.29 1.052 1.65.577.32 1.328.46 2.1.42 1.08-.06 1.896-.44 2.426-1.131.453-.59.75-1.4.883-2.405-.93-.28-1.975-.42-3.108-.42-.275 0-.553.01-.82.032z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">THREADS</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">@brentbryson</p>
        </div>
      </div>
      <div className="border-l-2 border-[rgba(232,114,42,0.3)] pl-4 mb-3">
        <p className="text-[#b0b0b0] text-sm leading-relaxed">Most people follow up once and quit. The AI doesn't quit. That's the difference between broke and booked.</p>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setLiked(!liked)} className={`flex items-center gap-1.5 text-xs font-mono transition-colors ${liked ? "text-[#E8722A]" : "text-[#8a8a8a] hover:text-[#E8722A]"}`}>
          <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          {liked ? "12" : "11"}
        </button>
        <span className="text-xs font-mono text-[#8a8a8a]">💬 3</span>
        <span className="text-xs font-mono text-[#8a8a8a]">🔄 7</span>
      </div>
    </Card>
  );
}

// ─── Pinterest ─────────────────────────────────────────────────────────────────
export function PinterestPrimitive() {
  const [saved, setSaved] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#E8722A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">PINTEREST</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">Tiger Claw Boards</p>
        </div>
      </div>
      <div className="aspect-[3/4] max-h-48 rounded-lg bg-[#0a0a0a] border border-[rgba(232,114,42,0.1)] flex items-center justify-center relative overflow-hidden">
        <span className="text-[#E8722A] text-xs font-mono opacity-60">Pin Preview</span>
        <button
          onClick={() => setSaved(!saved)}
          className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-[10px] font-bold font-mono uppercase transition-all duration-200 active:scale-95 ${
            saved ? "bg-[#4ADE80] text-black" : "bg-[#E8722A] text-white"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <p className="mt-3 text-white text-sm font-medium">AI Follow-Up System Blueprint</p>
    </Card>
  );
}

// ─── LinkedIn ──────────────────────────────────────────────────────────────────
export function LinkedInPrimitive() {
  const [connected, setConnected] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#E8722A]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">LINKEDIN</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">Brent Bryson &bull; Founder</p>
        </div>
        <button
          onClick={() => setConnected(!connected)}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 ${
            connected
              ? "bg-transparent border border-[#E8722A] text-[#E8722A]"
              : "bg-[#E8722A] text-white hover:bg-[#ff8a3d]"
          }`}
        >
          {connected ? "Connected" : "Connect"}
        </button>
      </div>
      <div className="rounded-lg bg-[#0a0a0a] border border-[rgba(232,114,42,0.1)] p-4">
        <p className="text-[#b0b0b0] text-sm leading-relaxed">25 years at the top of my company. Now I'm building AI systems that do what took me decades — in days. The follow-up is everything.</p>
        <div className="mt-3 flex items-center gap-3 text-xs font-mono text-[#8a8a8a]">
          <span>👍 47</span>
          <span>💬 12 comments</span>
        </div>
      </div>
    </Card>
  );
}

// ─── X (Twitter) ───────────────────────────────────────────────────────────────
export function XPrimitive() {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#E8722A]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">X (TWITTER)</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">@brentbryson</p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-[#b0b0b0] text-sm leading-relaxed">Built 9 Subway restaurants. Earned top of my company for 25 years. Now at 67, I'm building AI agents that book Zoom calls automatically. The fortune is in the follow up. 🐯</p>
      </div>
      <div className="flex items-center gap-6 border-t border-[rgba(232,114,42,0.1)] pt-3">
        <span className="text-xs font-mono text-[#8a8a8a]">💬 8</span>
        <button onClick={() => setRetweeted(!retweeted)} className={`text-xs font-mono transition-colors ${retweeted ? "text-[#4ADE80]" : "text-[#8a8a8a] hover:text-[#4ADE80]"}`}>
          🔄 {retweeted ? "24" : "23"}
        </button>
        <button onClick={() => setLiked(!liked)} className={`text-xs font-mono transition-colors ${liked ? "text-[#E8722A]" : "text-[#8a8a8a] hover:text-[#E8722A]"}`}>
          {liked ? "❤️" : "🤍"} {liked ? "142" : "141"}
        </button>
        <span className="text-xs font-mono text-[#8a8a8a]">📊 2.1K</span>
      </div>
    </Card>
  );
}

// ─── Discord ───────────────────────────────────────────────────────────────────
export function DiscordPrimitive() {
  const [joined, setJoined] = useState(false);
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(232,114,42,0.2)] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#E8722A]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm font-[family-name:var(--font-display)]">DISCORD</h3>
          <p className="text-[#8a8a8a] text-xs font-mono">Tiger Claw Community</p>
        </div>
        <button
          onClick={() => setJoined(!joined)}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 ${
            joined
              ? "bg-transparent border border-[#4ADE80] text-[#4ADE80]"
              : "bg-[#E8722A] text-white hover:bg-[#ff8a3d]"
          }`}
        >
          {joined ? "Joined" : "Join"}
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a8a]">
          <span className="text-[#E8722A]">#</span> general
          <span className="ml-auto text-[10px]">42 online</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a8a]">
          <span className="text-[#E8722A]">#</span> ai-builders
          <span className="ml-auto text-[10px]">18 online</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a8a]">
          <span className="text-[#E8722A]">#</span> follow-up-wins
          <span className="ml-auto text-[10px]">7 online</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a8a]">
          <span className="text-[#E8722A]">🔊</span> Voice Lounge
          <span className="ml-auto text-[10px]">3 in call</span>
        </div>
      </div>
    </Card>
  );
}
