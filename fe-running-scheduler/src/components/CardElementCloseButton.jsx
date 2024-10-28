import { Link } from "react-router-dom";

const CardElementCloseButton = () => {
  return (
    <div className="card-actions justify-end">
            <Link
              className="btn btn-square btn-ghost btn-sm absolute top-2 right-2"
              to={-1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
  )
}

export default CardElementCloseButton