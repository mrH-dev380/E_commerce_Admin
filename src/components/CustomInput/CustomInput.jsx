/* eslint-disable react/prop-types */
import classnames from 'classnames/bind'
import styles from './CustomInput.module.scss'

const cx = classnames.bind(styles)

const CustomInput = ({
  type,
  label,
  id,
  className,
  name,
  value,
  onChange,
  onBlur,
}) => {
  const classes = cx('form-control', {
    [className]: className,
  })
  return (
    <div className={cx('form-floating', 'mt-3')}>
      <input
        type={type}
        className={classes}
        id={id}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default CustomInput
