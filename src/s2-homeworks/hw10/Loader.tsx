import s from './Loader.module.css'

export const Loader = () => <div className={ s.loader}>
    <svg className={s.spinner} viewBox="0 0 50 50">
        <circle className={s.path} cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
    </svg>
</div>
