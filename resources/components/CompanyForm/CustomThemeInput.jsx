import { SliderPicker } from 'react-color';
import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import LinkButton from '../Button/LinkButton';
import { useTranslation } from 'react-i18next';

const CustomThemeInput = ({fontColor, backgroundColor, setFontColor, setBackgroundColor }) => {
    const { t } = useTranslation();
    const changeBackgroungHandler = (colors) => {
    const col =
      'rgb(' + colors.rgb.r + ',' + colors.rgb.g + ',' + colors.rgb.b + ')';
    setBackgroundColor({ background: col, color: colors.rgb });
  };

  return (<Stack 
    mb={3} 
    justifyContent={'center'} 
    alignItems={'center'} 
    gap={3}
    >
        <Stack>
            <Typography variant="body2" component="p">
                {t('company.form.custom_add_colors')}
            </Typography>
            <Typography
                variant="body2"
                component="p"
                textAlign={'center'}
                sx={{ color: '#979797', fontSize: '11px' }}
            >
                {t('company.form.cutom_optional')}
            </Typography>
        </Stack>
        <Stack>
            <Typography variant="body2" component="p">
                {t('company.form.cutom_main_color')}
            </Typography>
            <SliderPicker
                className="picker"
                color={backgroundColor.color}
                onChange={changeBackgroungHandler}
            />
        </Stack>
        <Stack>
            <Typography variant="body2" component="p">
                {t('company.form.cutom_font_color')}
            </Typography>
            <Stack
                direction={'row'}
                spacing={3}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Box
                    onClick={() => setFontColor({ color: '#000000' })}
                    sx={{
                        width: '50px',
                        height: '50px',
                        background: '#000',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
                <Box
                    onClick={() => setFontColor({ color: '#ffffff' })}
                    sx={{
                        width: '50px',
                        height: '50px',
                        background: '#fff',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
            </Stack>
        </Stack>
        <Stack justifyContent={'center'} alignItems={'center'} mt={3}>
            <Typography variant="body2" component="p">
                {t('company.form.custom_preview')}
            </Typography>
            <LinkButton
                style={{
                backgroundColor: backgroundColor.background,
                color: fontColor.color,
                width: '90px',
                }}
                mt={2}
            >
                {'Button'}
            </LinkButton>
        </Stack>
    </Stack>
  )
}
export default CustomThemeInput
