// import mui
import { Grid } from '@mui/material'
// import style
import {
  StyledBox,
  StyledGridContainer,
  StyledTypoTitle,
  StyledTypo,
} from './StyledHero'
// import types
import { HeroProps } from '@/utils/types/general'

const Hero = ({ title = 'Bienvenue sur document AI', para }: HeroProps) => {
  return (
    <StyledBox>
      <StyledGridContainer container direction="column">
        <Grid item xs={12}>
          <StyledTypoTitle variant="body1" component="h1">
            {title}
          </StyledTypoTitle>
        </Grid>
        <Grid item xs={12} sx={{ pt: '2em' }}>
          <StyledTypo variant="h6">{para}</StyledTypo>
        </Grid>
      </StyledGridContainer>
    </StyledBox>
  )
}

export default Hero
