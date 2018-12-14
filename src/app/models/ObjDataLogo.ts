// Datos de prueba para d3 gráfico
class DataLogo {
    open: number;
    close: number;
    date: string | Date;
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