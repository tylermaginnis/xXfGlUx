'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Card3DProps {
  tier: 'GOLD' | 'BLACK';
  memberName?: string;
  memberId?: string;
  className?: string;
  interactive?: boolean;
}

export function Card3D({ 
  tier, 
  memberName = 'MEMBER NAME', 
  memberId = 'XXXX XXXX XXXX',
  className,
  interactive = true 
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive || typeof window === 'undefined') return;
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 10;
      const rotateY = (centerX - e.clientX) / 10;

      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive]);

  const isGold = tier === 'GOLD';

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative w-full max-w-md mx-auto cursor-pointer perspective-1000',
        className
      )}
      onClick={() => interactive && setIsFlipped(!isFlipped)}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: rotation.x === 0 && rotation.y === 0 ? 'transform 0.3s ease-out' : 'none',
      }}
    >
      {/* Card Container */}
      <div
        className={cn(
          'relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl',
          'transform-gpu transition-transform duration-500'
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of Card */}
        <div
          className={cn(
            'absolute inset-0 w-full h-full backface-hidden',
            isGold
              ? 'bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700'
              : 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
          )}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Shine/Reflection Effect */}
          <div
            className={cn(
              'absolute inset-0 opacity-30',
              isGold
                ? 'bg-gradient-to-br from-transparent via-white/20 to-transparent'
                : 'bg-gradient-to-br from-transparent via-white/10 to-transparent'
            )}
          />

          {/* Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Card Content */}
          <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white">
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-light tracking-wider mb-2">ACCESS VLX</div>
                <div className={cn(
                  'text-2xl font-bold tracking-wider',
                  isGold ? 'text-yellow-900' : 'text-white'
                )}>
                  {tier} CARD
                </div>
              </div>
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center p-2',
                isGold 
                  ? 'bg-yellow-800/30 border-2 border-yellow-700' 
                  : 'bg-white/10 border-2 border-white/20'
              )}>
                <Image 
                  src="/vlx-icon.png" 
                  alt="Access VLX"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  style={{ filter: isGold ? 'brightness(0.6) sepia(1) hue-rotate(25deg) saturate(2)' : 'brightness(1.2)' }}
                />
              </div>
            </div>

            {/* Middle Section - Chip */}
            <div className="flex items-center gap-4">
              <div className={cn(
                'w-12 h-10 rounded-md',
                isGold
                  ? 'bg-gradient-to-br from-yellow-300 to-yellow-500'
                  : 'bg-gradient-to-br from-gray-400 to-gray-600'
              )} />
              <div className="flex-1">
                <div className="text-xs font-light tracking-widest mb-1">MEMBER ID</div>
                <div className="text-lg font-mono tracking-wider">{memberId}</div>
              </div>
            </div>

            {/* Bottom Section */}
            <div>
              <div className="text-xs font-light tracking-widest mb-2">CARDHOLDER</div>
              <div className="text-xl font-semibold tracking-wide uppercase">
                {memberName}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-4 right-4 opacity-20 w-24 h-24">
              <Image 
                src="/vlx-icon.png" 
                alt="Access VLX"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                style={{ filter: isGold ? 'brightness(0.4) sepia(1) hue-rotate(25deg) saturate(2)' : 'brightness(0.8)' }}
              />
            </div>
          </div>

          {/* Holographic Effect */}
          <div
            className={cn(
              'absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none',
              isGold
                ? 'bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent'
                : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
            )}
            style={{
              background: isGold
                ? 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)'
                : 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
            }}
          />
        </div>

        {/* Back of Card */}
        <div
          className={cn(
            'absolute inset-0 w-full h-full backface-hidden rotate-y-180',
            isGold
              ? 'bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700'
              : 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
          )}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Magnetic Stripe */}
          <div className="absolute top-8 left-0 right-0 h-12 bg-black" />

          {/* Card Details */}
          <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white pt-24">
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-xs font-light mb-2">CUSTOMER SERVICE</div>
                <div className="text-sm">josh@accessVLX.com</div>
                <div className="text-sm">518-339-0445</div>
              </div>
              
              <div className="text-xs text-white/60">
                This card is the property of Access VLX. If found, please return to Access VLX, Las Vegas, NV.
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="text-xs text-white/40">
                {tier} MEMBERSHIP
              </div>
              <div className={cn(
                'text-2xl font-bold',
                isGold ? 'text-yellow-900' : 'text-white'
              )}>
                ACCESS VLX
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className={cn(
          'absolute -inset-4 rounded-3xl blur-2xl opacity-20 -z-10 transition-opacity',
          isGold ? 'bg-yellow-500' : 'bg-white'
        )}
      />
    </div>
  );
}

