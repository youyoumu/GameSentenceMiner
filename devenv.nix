{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:
let
  pkgs-unstable = import inputs.nixpkgs-unstable { system = pkgs.stdenv.system; };
  base = pkgs-unstable.appimageTools.defaultFhsEnvArgs;
  fhs = pkgs-unstable.buildFHSEnv (
    base
    // {
      name = "fhs";
      targetPkgs =
        pkgs:
        (base.targetPkgs pkgs)
        ++ (with pkgs; [
          pkg-config
          ncurses
          linuxHeaders
          gcc
        ]);
      profile = "export FHS=1";
      runScript = "bash";
    }
  );
in
{
  env.GREET = "devenv";

  packages = [
    pkgs-unstable.linuxHeaders
    pkgs-unstable.uv
    fhs
  ];
  languages.python.enable = true;
  languages.python.package = pkgs-unstable.python310;
  languages.javascript.enable = true;
  languages.javascript.package = pkgs-unstable.nodejs_22;

  enterShell = ''
    fhs -c '
      fish -C "
        source ./.venv/bin/activate.fish
        set -x SSL_CERT_FILE (python -m certifi)
        which python;
        which node;
        python --version;
        node --version
      " && exit
    '
    exit
  '';

}
