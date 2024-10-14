// src/store/hooks.js
import { useDispatch, useSelector } from "react-redux";

// Use these hooks throughout the app
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
