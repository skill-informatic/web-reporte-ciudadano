import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CardTypes } from "../models/globalInfo.types";
interface Types {
  cards: CardTypes[];
}
const CardContainer = ({ cards }: Types) => {
  return (
    <Grid
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          sm: " 1fr",
          md: " 1fr",
          lg: " 1fr 1fr",
          xl: " 230px 230px 230px",
        },
        justifyItems: {
          xs: "center",
          lg: "left",
        },
        columnGap: {
          xs: "3%",
          md: "1.5%",
          lg: "3%",
          xl: "3%",
        },
        rowGap: {
          xs: "3%",
        },
      }}
    >
      {cards.map((carta: CardTypes, index: number) => (
        <Card
          key={index}
          sx={{
            color: "#767676",
            width: "230px",
            cursor: "pointer",
            height: "250px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: ".1rem hidden black",
            transition: "all .2s ease",
            "&:hover": {
              transition: "all .2s ease",
              boxShadow: "4px 4px 5px 1px rgba(0, 0, 0, 0.4)",
            },
          }}
          onClick={() => carta.action()}
        >
          <CardContent>
            {carta.icono}
            <Typography
              variant="h6"
              sx={{
                color: "#767676",
                fontSize: "1.2rem",
              }}
            >
              {carta.name}
            </Typography>
            <Box
              component="div"
              sx={{
                width: "150px",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "400",
                  lineHeight: ".9rem",
                  //falta arreglar el open sans
                  fontFamily: "Open sans",
                  fontSize: ".9rem",
                  color: "#B0B0B0",
                }}
              >
                {carta?.subtitle}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};
export default CardContainer;
