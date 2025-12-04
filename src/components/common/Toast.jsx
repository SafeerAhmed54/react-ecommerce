import { useEffect } from 'react'
import './Toast.css'

/**
 * Toast Component
 * 
 * Displays temporary notification messages to the user.
 * Automatically dismisses after a specified duration.
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The message to display
 * @param {string} props.type - Type of toast (success, error, info)
 * @param {function} props.onClose - Callback when toast is dismissed
 * @param {number} props.duration - Duration in ms before auto-dismiss (default: 3000)
 */
function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'ℹ'}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  )
}

export default Toast
