import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import Detail from '../components/Detail'
import ExerciseVideo from '../components/ExerciseVideo'
import SimilarExercises from '../components/SimilarExercises'

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
  const [equipmentExercises, setequipmentExercises] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDBUrl = 'https://exercisedb.p.rapidapi.com'
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'

      const exerciseDetailData = await fetchData(`${exerciseDBUrl}/exercises/exercise/${id}`, exerciseOptions)
      setExerciseDetail(exerciseDetailData)

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions)
      setExerciseVideos(exerciseVideosData.contents)

      const targetMusclesExercisesData = await fetchData(`${exerciseDBUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions)
      setTargetMuscleExercises(targetMusclesExercisesData)

      const equipmentExercisessData = await fetchData(`${exerciseDBUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions)
      setequipmentExercises(equipmentExercisessData)
    }
    fetchExercisesData()
  }, [id])


  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideo exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExerciseDetail