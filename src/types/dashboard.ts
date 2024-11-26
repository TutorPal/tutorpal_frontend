export interface Course {
    id: string
    title: string
    institution: string
    progress: {
      completed: number
      total: number
    }
    status: 'In Progress' | 'Start Learning'
    image: string
  }
  
  export interface Metrics {
    attendance: number
    homework: number
    tests: number
  }
  
  export interface SessionData {
    present: number
    absent: number
    excused: number
    total: number
  }
  
  