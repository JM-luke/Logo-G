// Datos de prueba para d3 gráfico
class DataLogo {

    date: string | Date;
    data: {};

}
class Input{
    name: String;
    pos_memoria: Number;
    enable: Boolean;
    Mailing: Boolean;
}
class Output {
    name: String;
    pos_memoria: Number;
    enable: Boolean;
}
class ConfigLogo {
    inputs: Input[];
    outputs: Output[];
}
export {
    DataLogo,
    ConfigLogo
}