import './index.css'

const FailureView = () => (
  <>
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/djan3q2wv/image/upload/v1740137179/Group_7519_wofdu7.png"
        alt="failure view"
      />
      <div className="retry-block">
        <h1>Oops! Something went wrong.</h1>
        <p>We are having some trouble</p>
      </div>
    </div>
  </>
)

export default FailureView
