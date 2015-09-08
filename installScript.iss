; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{853B4B7F-BD69-45C3-ACA6-A295BB0D7155}
AppName=Red Bone Menu
AppVersion=1.0
;AppVerName=Red Bone Menu 1.0
AppPublisher=Will Dixon
AppPublisherURL=http://www.redbonealley.com/
AppSupportURL=http://www.redbonealley.com/
AppUpdatesURL=http://www.redbonealley.com/
DefaultDirName={pf}\Red Bone Menu
DefaultGroupName=Red Bone Menu
AllowNoIcons=yes
LicenseFile=C:\Users\Will\Documents\GitHub\redboneMenu\redboneWin32\LICENSE
OutputBaseFilename=setup
SetupIconFile=C:\Users\Will\Documents\GitHub\redboneMenu\dog.ico
Compression=lzma
SolidCompression=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 0,6.1

[Files]
Source: "C:\Users\Will\Documents\GitHub\redboneMenu\redboneWin32\Red Bone Menu.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\Will\Documents\GitHub\redboneMenu\redboneWin32\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\Will\Documents\GitHub\redboneMenu\redboneWin32\data\*"; DestDir: "{app}\data"; Flags: ignoreversion; Permissions: everyone-modify
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\Red Bone Menu"; Filename: "{app}\Red Bone Menu.exe"
Name: "{group}\{cm:UninstallProgram,Red Bone Menu}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\Red Bone Menu"; Filename: "{app}\Red Bone Menu.exe"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\Red Bone Menu"; Filename: "{app}\Red Bone Menu.exe"; Tasks: quicklaunchicon

[Run]
Filename: "{app}\Red Bone Menu.exe"; Description: "{cm:LaunchProgram,Red Bone Menu}"; Flags: nowait postinstall skipifsilent

