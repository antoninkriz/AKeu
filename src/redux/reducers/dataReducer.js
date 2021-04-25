import {DATA_RESUME, DATA_POST, DATA_404} from "../types";
import defaultResume from '../../public/api/resume.json'

// All posts
import postAdamDekanem from '../../public/api/posts/adam-dekanem.json'
import postCetip from '../../public/api/posts/cetip.json'
import postCtuTimetableGenerator from '../../public/api/posts/ctu-timetable-generator.json'
import postCtuTimetableGeneratorNew from '../../public/api/posts/ctu-timetable-generator-new.json'
import postKriziciUnofficialAppForSkolakrizikCz from '../../public/api/posts/krizici-unofficial-app-for-skolakrizik-cz.json'
import postLetsloud from '../../public/api/posts/letsloud.json'
import postPedfCuniUserFriendlyRecognitionOfCompletionOfCourses from '../../public/api/posts/pedf-cuni-user-friendly-recognition-of-completion-of-courses.json'

const posts = {
  'adam-dekanem': postAdamDekanem,
  'cetip': postCetip,
  'ctu-timetable-generator': postCtuTimetableGenerator,
  'ctu-timetable-generator-new': postCtuTimetableGeneratorNew,
  'krizici-unofficial-app-for-skolakrizik-cz': postKriziciUnofficialAppForSkolakrizikCz,
  'letsloud': postLetsloud,
  'pedf-cuni-user-friendly-recognition-of-completion-of-courses': postPedfCuniUserFriendlyRecognitionOfCompletionOfCourses,
}

const initialState = {
  resume: {
    ...defaultResume,
    reload: ''
  },
  posts: posts
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_RESUME:
      return {
        ...state,
        resume: action.payload
      };
    case DATA_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.url] : action.payload.content
        }
      }
    case DATA_404:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload] : 404
        }
      }
    default:
      return state;
  }
}

export default dataReducer;
