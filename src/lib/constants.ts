export const colors = {
    primary: '#20B2AA',
    background: '#E0F2F1',
    accent: '#FF6B6B',
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    }
  } as const
  
  export const sidebarItems = [
    { name: 'Dashboard', icon: 'Home' },
    { name: 'Explore', icon: 'Compass' },
    { name: 'Create', icon: 'PlusSquare' },
    { name: 'Manage', icon: 'Settings' },
    { name: 'Messages', icon: 'MessageSquare' },
    { name: 'Notifications', icon: 'Bell' }
  ] as const
  
  