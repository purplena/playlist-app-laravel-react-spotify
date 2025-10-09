import { CircularProgress, Stack } from "@mui/material"

const CustomLoader = () => {
    return (
        <Stack justifyContent="center" alignItems="center" mt={5}>
            <CircularProgress />
        </Stack>
    )
}
export default CustomLoader
