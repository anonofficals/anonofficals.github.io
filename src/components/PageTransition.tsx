
import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/contexts/NavigationContext';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const { direction } = useNavigation();
  
  // Define page order for slide direction
  const pageOrder = ['/', '/about', '/features', '/projects', '/internships', '/contact'];
  const currentIndex = pageOrder.indexOf(location.pathname);
  
  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 1.05,
    }),
  };

  return (
    <motion.div
      key={location.pathname}
      custom={direction}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth sliding
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      className="w-full min-h-screen overflow-x-hidden"
      style={{
        position: 'relative',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
