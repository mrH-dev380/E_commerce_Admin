import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  getEnquiryById,
  // resetState,
  updateEnquiry,
} from '../features/enquiry/enquirySlice'
import { BiArrowBack } from 'react-icons/bi'

const ViewEnquiry = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getEnquiryId = location.pathname.split('/')[3]
  const enquiryState = useSelector((state) => state.enquiry)
  const {
    enquiryName,
    enquiryMobile,
    enquiryEmail,
    enquiryComment,
    enquiryStatus,
  } = enquiryState

  useEffect(() => {
    dispatch(getEnquiryById(getEnquiryId))
  }, [getEnquiryId])
  const goBack = () => {
    navigate(-1)
  }
  const setEnquiryStatus = (enquiry, enquiryId) => {
    const data = { id: enquiryId, status: enquiry }
    dispatch(updateEnquiry(data))
    setTimeout(() => {
      dispatch(getEnquiryById(getEnquiryId))
    }, 100)
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enquiryName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+91${enquiryMobile}`}>{enquiryMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:{enquiryEmail}`}>{enquiryEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enquiryComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enquiryStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name="status"
              value={enquiryStatus ? enquiryStatus : 'Submitted'}
              className="form-control form-select"
              id=""
              onChange={(status) =>
                setEnquiryStatus(status.target.value, getEnquiryId)
              }
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEnquiry
