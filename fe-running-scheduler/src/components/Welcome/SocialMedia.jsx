const SocialMedia = () => {
  return (
    <div className="flex flex-col items-center justify-center">
    <p className="flex items-center">
      Follow us soon on
      <a
        // href="https://twitter.com/yourhandle"
        className="link link-primary ml-1 flex items-center"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
          alt="X logo"
          className="w-4 h-4 mr-1"
        />
      </a>
    </p>
  </div>
  )
}

export default SocialMedia;