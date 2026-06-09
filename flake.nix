{
  inputs = { };

  outputs =
    { ... }:
    let
      forAllSystems = f: { x86_64-linux = f "x86_64-linux"; };
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import <nixpkgs> { inherit system; };
          bunScripts = pkgs.symlinkJoin {
            name = "bun-scripts";
            paths = map (cmd: pkgs.writeShellScriptBin cmd "bun run ${cmd} -- \"$@\"") [
              "serve"
              "build"
              "prepare-dev"
              "sync-files"
              "watch"
              "update-pages"
              "update-scripts"
              "fetch-google-reviews"
              "clean"
              "test"
            ];
          };
          productupdate = pkgs.writeShellScriptBin "productupdate" (builtins.readFile ./scripts/run-product-plan.sh);
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              bun
              vips
              stdenv.cc.cc.lib
              bunScripts
              productupdate
              ];

            shellHook = ''
              export LD_LIBRARY_PATH="${pkgs.stdenv.cc.cc.lib}/lib:$LD_LIBRARY_PATH"

              cat <<EOF

              Available commands:
               serve               - Start development server
               build               - Build the project
               prepare-dev         - Prepare development environment
               sync-files          - Synchronize files
               watch               - Watch for changes
               update-pages        - Update pages
               fetch-google-reviews - Fetch Google Maps reviews
               clean               - Clean build directory
               test                - Run tests
               productupdate        - Execute PRODUCT_PLAN.md and verify changes

              EOF
              git pull
            '';
          };
        }
      );
    };
}
