import { useEffect, useState } from 'react'

function CheckoutSuccess() {
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        // Get session_id from URL
        const url = new URL(window.location.href)
        const sessionId = url.searchParams.get('session_id')
        
        if (!sessionId) {
          setError('No session ID found in URL')
          setLoading(false)
          return
        }
        
        // Call the Supabase function to verify and process the checkout session
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/success-hook?session_id=${sessionId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Include authorization header if needed
              // 'Authorization': `Bearer ${supabaseToken}`
            }
          }
        )
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify checkout session')
        }
        
        setSessionData(data)
      } catch (err) {
        console.error('Error fetching session data:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchSessionData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Processing your payment...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h2>
          <p className="mb-4">{error}</p>
          <a 
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Return to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
        </div>
        
        {sessionData && (
          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Amount:</span> {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: sessionData.session.currency
              }).format(sessionData.session.amount / 100)}
            </p>
            {sessionData.session.customer && sessionData.session.customer.email && (
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Email:</span> {sessionData.session.customer.email}
              </p>
            )}
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Transaction ID:</span> {sessionData.session.id}
            </p>
          </div>
        )}
        
        <a 
          href="/"
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded"
        >
          Return to Home
        </a>
      </div>
    </div>
  )
}

export default CheckoutSuccess