'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LordIconProps {
  src: string;
  trigger?: string;
  colors?: string;
  size?: number;
  target?: string;
  state?: string;
  delay?: string | number;
  direction?: number;
  className?: string;
}

export function LordIcon({
  src,
  trigger = 'hover',
  colors,
  size = 20,
  target,
  state,
  delay,
  direction,
  className,
}: LordIconProps) {
  const [loaded, setLoaded] = useState(false);
  const iconRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@lordicon/element')
        .then(({ defineElement }) => {
          defineElement();
          setLoaded(true);
        })
        .catch((err) => console.error('Failed to initialize LordIcon:', err));
    }
  }, []);

  // Sync attributes imperatively to ensure custom element registers them correctly in the DOM
  useEffect(() => {
    if (loaded && iconRef.current) {
      const el = iconRef.current;
      if (src && el.getAttribute('src') !== src) {
        el.setAttribute('src', src);
      }
      if (trigger && el.getAttribute('trigger') !== trigger) {
        el.setAttribute('trigger', trigger);
      }
      if (colors) {
        if (el.getAttribute('colors') !== colors) el.setAttribute('colors', colors);
      } else {
        if (el.hasAttribute('colors')) el.removeAttribute('colors');
      }
      if (target) {
        if (el.getAttribute('target') !== target) el.setAttribute('target', target);
      } else {
        if (el.hasAttribute('target')) el.removeAttribute('target');
      }
      if (state) {
        if (el.getAttribute('state') !== state) el.setAttribute('state', state);
      } else {
        if (el.hasAttribute('state')) el.removeAttribute('state');
      }
      if (delay) {
        const delayStr = String(delay);
        if (el.getAttribute('delay') !== delayStr) el.setAttribute('delay', delayStr);
      } else {
        if (el.hasAttribute('delay')) el.removeAttribute('delay');
      }
      if (direction !== undefined) {
        const directionStr = String(direction);
        if (el.getAttribute('direction') !== directionStr) el.setAttribute('direction', directionStr);
      } else {
        if (el.hasAttribute('direction')) el.removeAttribute('direction');
      }
    }
  }, [loaded, src, trigger, colors, target, state, delay, direction]);

  // Trigger play when state or direction changes
  useEffect(() => {
    if (loaded && iconRef.current) {
      const el = iconRef.current as any;
      const playIcon = () => {
        if (typeof el.play === 'function') {
          el.play();
        } else {
          el.addEventListener('ready', () => {
            if (typeof el.play === 'function') el.play();
          }, { once: true });
        }
      };
      // Microtask delay to ensure DOM attributes are fully applied first
      setTimeout(playIcon, 0);
    }
  }, [loaded, state, direction]);

  if (!loaded) {
    return <div style={{ width: size, height: size, overflow: 'visible' }} className={className} />;
  }

  return React.createElement('lord-icon', {
    ref: iconRef,
    src,
    trigger,
    colors,
    target,
    state,
    delay,
    direction,
    style: { width: size, height: size, overflow: 'visible' },
    className,
  });
}
