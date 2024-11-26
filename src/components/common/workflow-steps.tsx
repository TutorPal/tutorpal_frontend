import Image from "next/image"

const steps = [
  {
    title: "Find a Tutor",
    description: "Search for Tutors by category, language or topic, see their  teaching style, review and availability.",
    imageSrc: "/work1.png"
  },
  {
    title: "Buy Course as NFT",
    description: "Choose from a variety of courses. Pay with Ethereum or other cryptocurrencies. If you don't finish the course within 60 days, the funds will be returned to you.",
    imageSrc: "/work2.png"
  },
  {
    title: "Teach and get Paid",
    description: "Create courses and set your own prices. Get paid instantly when students complete your courses. Withdraw your earnings at any time.",
    imageSrc: "/work3.png"
  }
]

export default function WorkflowSteps() {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Get started with TutorPal in three easy steps
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>
              <Image
                alt={`Workflow Step ${index + 1}: ${step.title}`}
                className="rounded-lg object-cover"
                height={200}
                src={step.imageSrc}
                width={300}
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

