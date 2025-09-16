import { useState, useEffect, useRef } from 'react';

// Animation hook for scroll-triggered animations
export const useScrollAnimation = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

// Animation hook for staggered animations
export const useStaggeredAnimation = (delay: number = 100) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return [ref, isVisible] as const;
};

// Animation hook for hover effects
export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return [ref, isHovered] as const;
};

// Animation hook for click animations
export const useClickAnimation = () => {
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
    };

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, []);

  return [ref, isClicked] as const;
};

// Animation hook for loading states
export const useLoadingAnimation = (isLoading: boolean) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowAnimation(true);
    } else {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return showAnimation;
};

// Animation hook for page transitions
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => {
    setIsTransitioning(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTransitioning(false);
        resolve();
      }, 300);
    });
  };

  return [isTransitioning, startTransition] as const;
};

// Animation hook for counter animations
export const useCounterAnimation = (
  targetValue: number,
  duration: number = 2000
) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (targetValue === 0) {
      setCurrentValue(0);
      return;
    }

    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = currentValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.round(startValue + (targetValue - startValue) * easeOut);
      
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration, currentValue]);

  return [currentValue, isAnimating] as const;
};

// Animation hook for typing effect
export const useTypingAnimation = (
  text: string,
  speed: number = 50
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    let index = 0;

    const typeChar = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        setTimeout(typeChar, speed);
      } else {
        setIsTyping(false);
      }
    };

    const timer = setTimeout(typeChar, speed);
    return () => clearTimeout(timer);
  }, [text, speed]);

  return [displayedText, isTyping] as const;
};
