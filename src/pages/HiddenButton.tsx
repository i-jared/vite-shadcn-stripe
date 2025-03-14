import { useState, useEffect, useRef } from 'react'

function HiddenButton() {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial button position
    if (containerRef.current && buttonRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      setButtonPosition({
        x: Math.random() * (containerRect.width - 100),
        y: Math.random() * (containerRect.height - 50)
      })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !buttonRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - containerRect.left
    const mouseY = e.clientY - containerRect.top
    
    const buttonX = buttonPosition.x
    const buttonY = buttonPosition.y
    const buttonWidth = 100 // approximate button width
    const buttonHeight = 50 // approximate button height
    
    // Calculate distance between mouse and button center
    const distance = Math.sqrt(
      Math.pow(mouseX - (buttonX + buttonWidth / 2), 2) + 
      Math.pow(mouseY - (buttonY + buttonHeight / 2), 2)
    )
    
    // Show button if mouse is close enough
    if (distance < 100) {
      setIsButtonVisible(true)
    } else {
      setIsButtonVisible(false)
    }
  }

  const handleCheckout = () => {
    // Redirect to Stripe checkout or handle checkout process
    alert('Starting checkout process!')
    // Implementation for Stripe checkout would go here
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-100"
      onMouseMove={handleMouseMove}
    >
      <h1 className="text-3xl font-bold mb-8">Find the Hidden Checkout Button</h1>
      <p className="mb-4">Move your mouse around to reveal the hidden button</p>
      
      <div className="relative w-full max-w-3xl h-96 border-2 border-dashed border-gray-400 bg-white rounded-lg">
        <button
          ref={buttonRef}
          className={`absolute transition-opacity duration-300 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ${
            isButtonVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: `${buttonPosition.x}px`,
            top: `${buttonPosition.y}px`,
            pointerEvents: isButtonVisible ? 'auto' : 'none'
          }}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
      
      <div className="mt-8">
        <p>The button will appear when you get close to it!</p>
      </div>
    </div>
  )
}

export default HiddenButton