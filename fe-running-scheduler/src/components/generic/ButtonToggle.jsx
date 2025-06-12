const ButtonToggle = ({ text, onChange, isChecked }) => {
    // console.log("Toggle State at ButtonToggle.jsx", text, onChange);

    return (
        <label className="label cursor-pointer">
            <span className="label-text text-xs md:text-sm text-nowrap">
                {text}
            </span>
            <input
                type="checkbox"
                checked={isChecked}
                className="toggle toggle-xs sm:toggle-md toggle-accent mx-2"
                onChange={onChange}
            />
        </label>
    );
};

export default ButtonToggle;
