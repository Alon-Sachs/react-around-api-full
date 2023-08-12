export default function Form({name, buttonText, onSubmit, children ,formClass, submitButtonClass}) {

    return (
                <form className={formClass} name={name} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className={submitButtonClass}>{buttonText}</button>
                </form>
    )
}
